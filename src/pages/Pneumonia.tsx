import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Pneumonia() {
  const [setting, setSetting] = useState<string>('')
  const [onset, setOnset] = useState<string>('')
  const [classification, setClassification] = useState<any>(null)

  // CURB-65 calculator
  const [confusion, setConfusion] = useState<boolean>(false)
  const [urea, setUrea] = useState<boolean>(false)
  const [respRate, setRespRate] = useState<boolean>(false)
  const [bloodPressure, setBloodPressure] = useState<boolean>(false)
  const [age65, setAge65] = useState<boolean>(false)
  const [curb65Result, setCurb65Result] = useState<any>(null)

  const classifyPneumonia = () => {
    let type = ''
    let pathogens: string[] = []
    let notes: string[] = []

    if (setting === 'community' || onset === 'before_admission') {
      type = 'CAP (Community-Acquired Pneumonia)'
      pathogens = ['Streptococcus pneumoniae', 'Haemophilus influenzae', 'Atypicals (Mycoplasma, Chlamydia, Legionella)', 'Respiratory viruses']
      notes.push('Onset in community or <48 hours after hospital admission')
      notes.push('Use CURB-65 for severity assessment')
    } else if (onset === 'after_48h_hospital') {
      type = 'HAP (Hospital-Acquired Pneumonia)'
      pathogens = ['Pseudomonas aeruginosa', 'MRSA', 'Enterobacteriaceae', 'Acinetobacter']
      notes.push('Onset ≥48 hours after hospital admission')
      notes.push('Higher antibiotic resistance risk')
      notes.push('Broader empiric coverage needed')
    } else if (setting === 'mechanically_ventilated') {
      type = 'VAP (Ventilator-Associated Pneumonia)'
      pathogens = ['Pseudomonas aeruginosa', 'MRSA', 'Acinetobacter', 'Klebsiella pneumoniae']
      notes.push('Onset ≥48 hours after intubation')
      notes.push('Highest antibiotic resistance risk')
      notes.push('Requires aggressive empiric therapy')
    }

    setClassification({ type, pathogens, notes })
  }

  const calculateCurb65 = () => {
    let score = 0
    if (confusion) score++
    if (urea) score++
    if (respRate) score++
    if (bloodPressure) score++
    if (age65) score++

    let severity = ''
    let mortality = ''
    let recommendation = ''

    if (score === 0 || score === 1) {
      severity = 'Low'
      mortality = '<3%'
      recommendation = 'Consider outpatient treatment'
    } else if (score === 2) {
      severity = 'Moderate'
      mortality = '9%'
      recommendation = 'Consider short inpatient stay or closely monitored outpatient'
    } else if (score >= 3) {
      severity = 'High'
      mortality = '15-40%'
      recommendation = 'Hospital admission, consider ICU if score ≥4'
    }

    setCurb65Result({ score, severity, mortality, recommendation })
  }

  const resetCurb65 = () => {
    setConfusion(false)
    setUrea(false)
    setRespRate(false)
    setBloodPressure(false)
    setAge65(false)
    setCurb65Result(null)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Pneumonia</h1>
        <p className="text-lg text-muted-foreground">
          CAP vs HAP vs VAP differentiation, severity assessment, and management pathways
        </p>
      </div>

      {/* Educational Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pneumonia Classification Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">CAP - Community-Acquired Pneumonia</h4>
              <p className="text-sm">Onset in the community or &lt;48 hours after hospital admission</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/20 border border-purple-500">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">HAP - Hospital-Acquired Pneumonia</h4>
              <p className="text-sm">Onset ≥48 hours after hospital admission (non-ventilated patients)</p>
            </div>
            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">VAP - Ventilator-Associated Pneumonia</h4>
              <p className="text-sm">Onset ≥48 hours after endotracheal intubation and mechanical ventilation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pneumonia Pathway Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Pneumonia Pathway Builder</CardTitle>
          <CardDescription>Interactive tool to classify pneumonia type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="font-semibold mb-2 block">Patient Setting:</label>
            <select
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-border bg-background"
            >
              <option value="">Select setting</option>
              <option value="community">Community/Outpatient</option>
              <option value="hospital_floor">Hospital floor (non-ICU)</option>
              <option value="icu">ICU (non-ventilated)</option>
              <option value="mechanically_ventilated">Mechanically ventilated</option>
            </select>
          </div>

          <div>
            <label className="font-semibold mb-2 block">Symptom Onset:</label>
            <select
              value={onset}
              onChange={(e) => setOnset(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-border bg-background"
            >
              <option value="">Select timing</option>
              <option value="before_admission">Before hospital admission</option>
              <option value="within_48h">Within 48 hours of admission</option>
              <option value="after_48h_hospital">≥48 hours after hospital admission</option>
              <option value="after_48h_intubation">≥48 hours after intubation</option>
            </select>
          </div>

          <Button onClick={classifyPneumonia} className="w-full">
            Classify Pneumonia Type
          </Button>

          {classification && (
            <div className="p-6 rounded-lg border-2 bg-muted">
              <h3 className="text-2xl font-bold mb-4">{classification.type}</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Common Pathogens:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    {classification.pathogens.map((pathogen: string, idx: number) => (
                      <li key={idx}>{pathogen}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Points:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    {classification.notes.map((note: string, idx: number) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CURB-65 Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>CURB-65 Score (CAP Severity Assessment)</CardTitle>
          <CardDescription>Educational tool for Community-Acquired Pneumonia severity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div>
                <p className="font-semibold">Confusion (new onset)</p>
                <p className="text-sm text-muted-foreground">Altered mental status</p>
              </div>
              <input
                type="checkbox"
                checked={confusion}
                onChange={(e) => setConfusion(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div>
                <p className="font-semibold">Urea (BUN) &gt;19 mg/dL</p>
                <p className="text-sm text-muted-foreground">Or &gt;7 mmol/L</p>
              </div>
              <input
                type="checkbox"
                checked={urea}
                onChange={(e) => setUrea(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div>
                <p className="font-semibold">Respiratory rate ≥30/min</p>
                <p className="text-sm text-muted-foreground">Tachypnea</p>
              </div>
              <input
                type="checkbox"
                checked={respRate}
                onChange={(e) => setRespRate(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div>
                <p className="font-semibold">Blood pressure</p>
                <p className="text-sm text-muted-foreground">SBP &lt;90 mmHg or DBP ≤60 mmHg</p>
              </div>
              <input
                type="checkbox"
                checked={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div>
                <p className="font-semibold">Age ≥65 years</p>
                <p className="text-sm text-muted-foreground">Elderly</p>
              </div>
              <input
                type="checkbox"
                checked={age65}
                onChange={(e) => setAge65(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={calculateCurb65} className="flex-1">
              Calculate CURB-65 Score
            </Button>
            <Button onClick={resetCurb65} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>

          {curb65Result && (
            <div className="p-6 rounded-lg border-2 bg-muted">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-primary">{curb65Result.score}</div>
                <div className="text-sm text-muted-foreground">out of 5 points</div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background">
                  <span className="font-semibold">Severity: </span>
                  <span className={
                    curb65Result.severity === 'Low' ? 'text-green-600 dark:text-green-400' :
                    curb65Result.severity === 'Moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }>
                    {curb65Result.severity}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-background">
                  <span className="font-semibold">30-day mortality: </span>
                  <span>{curb65Result.mortality}</span>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary">
                  <p className="font-semibold mb-2">Recommendation:</p>
                  <p className="text-sm">{curb65Result.recommendation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Imaging Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Chest X-Ray Patterns (Educational)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Lobar Pneumonia</h4>
              <p className="text-sm">Homogeneous consolidation of entire lobe. Classic for <em>S. pneumoniae</em></p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Bronchopneumonia</h4>
              <p className="text-sm">Patchy, multifocal infiltrates. Common in HAP/VAP and aspiration</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Interstitial Pattern</h4>
              <p className="text-sm">Reticular or ground-glass opacities. Suggests atypical pneumonia or viral etiology</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Cavitation</h4>
              <p className="text-sm">Air-filled space within consolidation. Think anaerobes, <em>S. aureus</em>, TB, or fungal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complications */}
      <Card>
        <CardHeader>
          <CardTitle>Potential Complications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Respiratory failure:</strong> Requiring oxygen or ventilatory support</li>
            <li><strong>Sepsis/septic shock:</strong> Systemic inflammatory response</li>
            <li><strong>Pleural effusion/empyema:</strong> Fluid collection in pleural space</li>
            <li><strong>Lung abscess:</strong> Necrotic lung parenchyma</li>
            <li><strong>ARDS:</strong> Acute respiratory distress syndrome</li>
            <li><strong>Multi-organ failure:</strong> In severe cases</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
