import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import ClaimAssistant from "@/components/ClaimAssistant"

interface ClaimFormData {
  title: string
  description: string
  document_url?: string
}

export default function NewClaim() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ClaimFormData>()

  const onSubmit = async (data: ClaimFormData) => {
    try {
      setIsProcessing(true)

      // Get current user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
        return
      }

      // Process claim with AI
      const { data: processingResult, error: processingError } = await supabase.functions.invoke(
        'process-claim',
        {
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            documentUrl: data.document_url
          })
        }
      )

      if (processingError) {
        throw processingError
      }

      // Insert claim with AI processing results
      const { error: insertError } = await supabase
        .from('claims')
        .insert({
          title: data.title,
          description: data.description,
          document_url: data.document_url,
          user_id: session.user.id,
          status: processingResult.recommendation === 'APPROVE' ? 'approved' : 'pending'
        })

      if (insertError) throw insertError

      toast({
        title: "Claim submitted successfully",
        description: `Your claim has been ${processingResult.recommendation === 'APPROVE' ? 'automatically approved' : 'submitted for review'}.`,
      })

      navigate("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error submitting claim",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Submit New Claim</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className={errors.description ? "border-red-500" : ""}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="document_url" className="block text-sm font-medium mb-2">
              Supporting Document URL (optional)
            </label>
            <Input
              id="document_url"
              {...register("document_url")}
              type="url"
              placeholder="https://"
            />
          </div>

          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Submit Claim"}
          </Button>
        </form>
      </div>

      <ClaimAssistant />
    </div>
  )
}