import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function COPD() {
  const [ph, setPh] = useState<string>('')
  const [pco2, setPco2] = useState<string>('')
  const [rr, setRr] = useState<string>('')
  const [mentalStatus, setMentalStatus] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  const assessExacerbation = () => {
    const phNum = parseFloat(ph)
    const pco2Num = parseFloat(pco2)
    const rrNum = parseInt(rr)

    let severity = 'mild'
    let nippvIndicated = false
    let recommendations: string[] = []

    // Severe criteria
    if (phNum < 7.30 || pco2Num > 60 || mentalStatus === 'altered' || rrNum > 30) {
      severity = 'severe'
      recommendations.push('Immediate medical attention required')
      recommendations.push('Continuous monitoring')
      recommendations.push('Consider ICU consultation')
    } else if (phNum < 7.35 || pco2Num > 50 || rrNum > 25) {
      severity = 'moderate'
    }

    // NIPPV criteria (educational)
    if (phNum < 7.35 && pco2Num > 45 && mentalStatus !== 'altered') {
      nippvIndicated = true
      recommendations.push('NIPPV may be considered (educational concept)')
      recommendations.push('Ensure patient can protect airway')
      recommendations.push('Monitor closely for improvement or deterioration')
    }

    // Hypercapnic respiratory failure
    if (pco2Num > 45 && phNum < 7.35) {
      recommendations.push('Hypercapnic respiratory failure identified')
      recommendations.push('Controlled oxygen therapy (target SpO₂ 88-92%)')
      recommendations.push('Avoid excessive oxygen (risk of worsening hypercapnia)')
    }

    setResult({
      severity,
      nippvIndicated,
      recommendations,
    })
  }

  const getSeverityColor = () => {
    if (!result) return ''
    switch (result.severity) {
      case 'severe': return 'bg-red-100 dark:bg-red-900/20 border-red-500'
      case 'moderate': return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500'
      case 'mild': return 'bg-green-100 dark:bg-green-900/20 border-green-500'
      default: return ''
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">COPD Exacerbation</h1>
        <p className="text-lg text-muted-foreground">
          Master COPD exacerbation management including NIPPV initiation and hypercapnia recognition
        </p>
      </div>

      {/* Educational Content */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GOLD Classification (Conceptual)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted">
                <h4 className="font-semibold">GOLD 1 (Mild)</h4>
                <p className="text-sm">FEV₁ ≥80% predicted</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <h4 className="font-semibold">GOLD 2 (Moderate)</h4>
                <p className="text-sm">50% ≤ FEV₁ &lt;80% predicted</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <h4 className="font-semibold">GOLD 3 (Severe)</h4>
                <p className="text-sm">30% ≤ FEV₁ &lt;50% predicted</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <h4 className="font-semibold">GOLD 4 (Very Severe)</h4>
                <p className="text-sm">FEV₁ &lt;30% predicted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Exacerbation Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Respiratory infections:</strong> Viral or bacterial</li>
              <li><strong>Air pollution:</strong> Environmental irritants</li>
              <li><strong>Non-adherence:</strong> To maintenance medications</li>
              <li><strong>Weather changes:</strong> Cold air exposure</li>
              <li><strong>Comorbidities:</strong> Heart failure, PE, pneumonia</li>
              <li><strong>Unknown:</strong> ~30% of exacerbations</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Management Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Stepwise Acute Management (Educational)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Oxygen Therapy</h4>
                <p className="text-sm text-muted-foreground">Controlled oxygen: Target SpO₂ 88-92% (avoid excessive oxygen in hypercapnic patients)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Bronchodilator Therapy</h4>
                <p className="text-sm text-muted-foreground">Short-acting beta-2 agonists (SABA) and/or anticholinergics (educational concept)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Systemic Corticosteroids</h4>
                <p className="text-sm text-muted-foreground">Educational concept - reduces recovery time and improves outcomes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold">Antibiotics (If Indicated)</h4>
                <p className="text-sm text-muted-foreground">Purulent sputum (increased volume + color change) or severe exacerbation</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h4 className="font-semibold">Ventilatory Support (If Needed)</h4>
                <p className="text-sm text-muted-foreground">NIPPV for acute hypercapnic respiratory failure; intubation if NIPPV fails</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COPD Exacerbation Navigator */}
      <Card>
        <CardHeader>
          <CardTitle>COPD Exacerbation Navigator</CardTitle>
          <CardDescription>Interactive tool to assess severity and NIPPV need</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-2 block">Arterial pH:</label>
              <input
                type="number"
                step="0.01"
                min="6.8"
                max="7.6"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                placeholder="e.g., 7.28"
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 block">PaCO₂ (mmHg):</label>
              <input
                type="number"
                min="20"
                max="120"
                value={pco2}
                onChange={(e) => setPco2(e.target.value)}
                placeholder="e.g., 68"
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 block">Respiratory Rate (breaths/min):</label>
              <input
                type="number"
                min="8"
                max="50"
                value={rr}
                onChange={(e) => setRr(e.target.value)}
                placeholder="e.g., 28"
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 block">Mental Status:</label>
              <select
                value={mentalStatus}
                onChange={(e) => setMentalStatus(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              >
                <option value="">Select status</option>
                <option value="alert">Alert and oriented</option>
                <option value="sleepy">Sleepy but arousable</option>
                <option value="altered">Altered/confused</option>
              </select>
            </div>
          </div>

          <Button onClick={assessExacerbation} className="w-full">
            Assess Exacerbation
          </Button>

          {result && (
            <div className={`p-6 rounded-lg border-2 ${getSeverityColor()}`}>
              <h3 className="text-2xl font-bold mb-4 capitalize">{result.severity} Exacerbation</h3>

              {result.nippvIndicated && (
                <div className="mb-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    NIPPV May Be Indicated (Educational)
                  </h4>
                  <p className="text-sm">
                    Patient meets criteria for non-invasive positive pressure ventilation consideration
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-semibold">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  {result.recommendations.map((rec: string, idx: number) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">General Management:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Bronchodilator therapy (SABA ± anticholinergics)</li>
                  <li>Systemic corticosteroids (educational concept)</li>
                  <li>Antibiotics if purulent sputum or severe exacerbation</li>
                  <li>Monitor ABG, oxygen saturation, respiratory rate</li>
                  <li>Assess for complications (pneumonia, PE, pneumothorax)</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* NIPPV Criteria */}
      <Card>
        <CardHeader>
          <CardTitle>NIPPV Initiation Logic (Educational)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Indications for NIPPV</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Acute hypercapnic respiratory failure (pH &lt;7.35, PaCO₂ &gt;45)</li>
                <li>Severe dyspnea with respiratory distress</li>
                <li>Moderate to severe acidosis</li>
                <li>Patient able to protect airway and cooperate</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Contraindications for NIPPV</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Altered mental status/inability to protect airway</li>
                <li>Hemodynamic instability</li>
                <li>Recent facial/upper airway surgery</li>
                <li>Inability to clear secretions</li>
                <li>Severe respiratory acidosis (pH &lt;7.25)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hypercapnia Recognition */}
      <Card>
        <CardHeader>
          <CardTitle>Hypercapnia Identification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              <strong>Definition:</strong> PaCO₂ &gt;45 mmHg (normal: 35-45 mmHg)
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Clinical Signs:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Headache</li>
                <li>Confusion, drowsiness (CO₂ narcosis)</li>
                <li>Asterixis (flapping tremor)</li>
                <li>Bounding pulse</li>
                <li>Warm peripheries, flushed skin</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
              <p className="text-sm">
                <strong>Critical Pearl:</strong> Avoid high-flow oxygen in COPD patients with chronic hypercapnia.
                Target SpO₂ 88-92% to prevent worsening respiratory acidosis. Excessive oxygen can suppress hypoxic drive.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
