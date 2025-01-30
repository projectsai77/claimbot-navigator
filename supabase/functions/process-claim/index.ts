import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { title, description, documentUrl } = await req.json()

    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Basic rule-based verification
    const eligibilityScore = await analyzeClaimEligibility(title, description)
    
    // Process document if URL is provided
    let documentAnalysis = null
    if (documentUrl) {
      documentAnalysis = await analyzeDocument(documentUrl)
    }

    const result = {
      eligibilityScore,
      documentAnalysis,
      recommendation: eligibilityScore > 0.7 ? 'APPROVE' : 'REVIEW_NEEDED',
      confidence: eligibilityScore * 100
    }

    console.log('Claim processing result:', result)

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing claim:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Simple rule-based eligibility analysis
async function analyzeClaimEligibility(title: string, description: string): Promise<number> {
  const keywords = ['damage', 'loss', 'accident', 'theft', 'injury']
  const text = (title + ' ' + description).toLowerCase()
  
  let score = 0.5 // Base score
  
  // Check for presence of important keywords
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      score += 0.1
    }
  })

  // Length checks
  if (description.length > 100) {
    score += 0.1 // Detailed descriptions are better
  }

  // Cap the score at 1.0
  return Math.min(score, 1.0)
}

// Document analysis function
async function analyzeDocument(documentUrl: string): Promise<any> {
  // For now, return a basic analysis
  // This could be expanded to use OCR or more sophisticated document analysis
  return {
    documentPresent: true,
    format: documentUrl.split('.').pop()?.toLowerCase(),
    timestamp: new Date().toISOString()
  }
}