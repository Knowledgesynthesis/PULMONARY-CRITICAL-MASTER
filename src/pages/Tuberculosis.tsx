import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Tuberculosis() {
  const [testResult, setTestResult] = useState<string>('')
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [cxrFindings, setCxrFindings] = useState<string>('')
  const [tbClassification, setTbClassification] = useState<any>(null)

  const symptomList = [
    { id: 'cough', label: 'Persistent cough (>3 weeks)' },
    { id: 'hemoptysis', label: 'Hemoptysis (coughing blood)' },
    { id: 'fever', label: 'Fever' },
    { id: 'night_sweats', label: 'Night sweats' },
    { id: 'weight_loss', label: 'Weight loss' },
    { id: 'fatigue', label: 'Fatigue' },
  ]

  const toggleSymptom = (id: string) => {
    setSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const classifyTB = () => {
    let classification = ''
    let management: string[] = []
    let isolation = false

    const hasSymptoms = symptoms.length > 0
    const hasActiveCXR = cxrFindings === 'infiltrates' || cxrFindings === 'cavitation' || cxrFindings === 'miliary'
    const positiveTest = testResult === 'positive_quantiferon' || testResult === 'positive_ppd'

    if (positiveTest && !hasSymptoms && cxrFindings === 'normal') {
      classification = 'Latent TB Infection (LTBI)'
      management.push('No active disease - patient is not contagious')
      management.push('Treatment to prevent progression to active TB (educational)')
      management.push('Typical regimen: Isoniazid or rifampin (educational concept)')
      management.push('No isolation required')
    } else if (positiveTest && (hasSymptoms || hasActiveCXR)) {
      classification = 'Active TB (Suspected or Confirmed)'
      management.push('Patient is potentially contagious')
      management.push('Airborne isolation required')
      management.push('Sputum AFB smear and culture needed')
      management.push('Multi-drug treatment regimen (educational)')
      management.push('Typical regimen: RIPE (Rifampin, Isoniazid, Pyrazinamide, Ethambutol)')
      management.push('Treatment duration: 6-9 months minimum')
      isolation = true
    } else if (!positiveTest && hasSymptoms) {
      classification = 'TB Possible - Further Testing Needed'
      management.push('Consider TB even with negative screening tests')
      management.push('Obtain chest X-ray if not done')
      management.push('Sputum AFB smear and culture')
      management.push('Consider molecular testing (GeneXpert MTB/RIF)')
    } else {
      classification = 'Low Probability of TB'
      management.push('No evidence of TB infection')
      management.push('Consider alternative diagnoses')
    }

    setTbClassification({ classification, management, isolation })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Tuberculosis (TB)</h1>
        <p className="text-lg text-muted-foreground">
          Differentiate latent vs active TB, understand screening, and learn treatment algorithms
        </p>
      </div>

      {/* Educational Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latent TB Infection (LTBI)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Positive TB test (TST/IGRA)</li>
              <li>No symptoms</li>
              <li>Normal chest X-ray</li>
              <li>Not contagious</li>
              <li>~5-10% lifetime risk of progression to active TB</li>
              <li>Treatment prevents activation (educational)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active TB Disease</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Positive TB test + symptoms/CXR findings</li>
              <li>Patient is contagious (pulmonary TB)</li>
              <li>Requires airborne isolation</li>
              <li>Sputum AFB positive</li>
              <li>Abnormal chest X-ray findings</li>
              <li>Requires multi-drug therapy for 6-9 months</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Screening Tests */}
      <Card>
        <CardHeader>
          <CardTitle>TB Screening Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">TST (Tuberculin Skin Test / PPD)</h4>
              <p className="text-sm mb-2">Intradermal injection of purified protein derivative</p>
              <p className="text-sm"><strong>Positive if induration:</strong></p>
              <ul className="text-sm list-disc list-inside ml-4 mt-1">
                <li>≥5mm: HIV+, close contacts, CXR findings</li>
                <li>≥10mm: Recent immigrants, IVDU, healthcare workers</li>
                <li>≥15mm: Low-risk individuals</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">IGRA (Interferon-Gamma Release Assay)</h4>
              <p className="text-sm mb-2">Blood test (QuantiFERON, T-SPOT)</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>More specific than TST</li>
                <li>Not affected by BCG vaccination</li>
                <li>Single visit (vs 2 for TST)</li>
                <li>Preferred in BCG-vaccinated populations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TB Latent vs Active Tool */}
      <Card>
        <CardHeader>
          <CardTitle>TB Classification Tool</CardTitle>
          <CardDescription>Interactive tool to classify TB status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="font-semibold mb-2 block">TB Test Result:</label>
            <select
              value={testResult}
              onChange={(e) => setTestResult(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-border bg-background"
            >
              <option value="">Select test result</option>
              <option value="positive_quantiferon">Positive QuantiFERON/IGRA</option>
              <option value="positive_ppd">Positive PPD/TST</option>
              <option value="negative">Negative test</option>
              <option value="not_done">Not performed</option>
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Clinical Symptoms (select all present):</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {symptomList.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    symptoms.includes(symptom.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {symptom.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold mb-2 block">Chest X-Ray Findings:</label>
            <select
              value={cxrFindings}
              onChange={(e) => setCxrFindings(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-border bg-background"
            >
              <option value="">Select CXR findings</option>
              <option value="normal">Normal</option>
              <option value="infiltrates">Infiltrates (upper lobe)</option>
              <option value="cavitation">Cavitation</option>
              <option value="miliary">Miliary pattern (small nodules)</option>
              <option value="pleural_effusion">Pleural effusion</option>
            </select>
          </div>

          <Button onClick={classifyTB} className="w-full">
            Classify TB Status
          </Button>

          {tbClassification && (
            <div className="p-6 rounded-lg border-2 bg-muted">
              <h3 className="text-2xl font-bold mb-4">{tbClassification.classification}</h3>

              {tbClassification.isolation && (
                <div className="mb-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
                  <p className="font-semibold text-red-800 dark:text-red-300">
                    ⚠️ AIRBORNE ISOLATION REQUIRED
                  </p>
                  <p className="text-sm mt-1">Negative pressure room, N95 respirators for healthcare workers</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-semibold">Management:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  {tbClassification.management.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CXR Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Chest X-Ray Patterns in TB</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Primary TB</h4>
              <p className="text-sm">Lower/middle lobe infiltrates, hilar lymphadenopathy, pleural effusion. Common in children and immunocompromised</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Reactivation TB (Secondary TB)</h4>
              <p className="text-sm">Upper lobe infiltrates (apical/posterior segments), cavitation. Most common pattern in adults</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Miliary TB</h4>
              <p className="text-sm">Diffuse, small (1-3mm) nodules throughout both lungs. Hematogenous dissemination. Seen in immunocompromised</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Regimens */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Regimens (Educational Concept)</CardTitle>
          <CardDescription>Synthetic educational framework - not for clinical use</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Latent TB Treatment</h4>
              <p className="text-sm mb-2"><strong>Option 1:</strong> Isoniazid daily for 9 months</p>
              <p className="text-sm mb-2"><strong>Option 2:</strong> Rifampin daily for 4 months</p>
              <p className="text-sm"><strong>Option 3:</strong> Isoniazid + rifapentine weekly for 3 months</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/20 border border-purple-500">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Active TB Treatment (RIPE)</h4>
              <p className="text-sm mb-2"><strong>Intensive Phase (2 months):</strong></p>
              <ul className="text-sm list-disc list-inside ml-4 space-y-1">
                <li><strong>R</strong>ifampin</li>
                <li><strong>I</strong>soniazid</li>
                <li><strong>P</strong>yrazinamide</li>
                <li><strong>E</strong>thambutol</li>
              </ul>
              <p className="text-sm mt-2"><strong>Continuation Phase (4-7 months):</strong></p>
              <p className="text-sm ml-4">Rifampin + Isoniazid</p>
              <p className="text-sm mt-2 font-semibold">Total duration: 6-9 months minimum</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Tracing */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Tracing Principles (Educational)</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Identify close contacts (household, prolonged exposure)</li>
            <li>Screen contacts with TST or IGRA</li>
            <li>Obtain chest X-rays for symptomatic contacts</li>
            <li>Treat LTBI in high-risk contacts</li>
            <li>Monitor for symptom development</li>
            <li>Public health notification for confirmed cases</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
