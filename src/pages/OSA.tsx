import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function OSA() {
  const [snoring, setSnoring] = useState(false)
  const [tired, setTired] = useState(false)
  const [observed, setObserved] = useState(false)
  const [pressure, setPressure] = useState(false)
  const [bmi, setBmi] = useState(false)
  const [age, setAge] = useState(false)
  const [neck, setNeck] = useState(false)
  const [gender, setGender] = useState(false)
  const [result, setResult] = useState<any>(null)

  const calculateSTOPBANG = () => {
    let score = 0
    if (snoring) score++
    if (tired) score++
    if (observed) score++
    if (pressure) score++
    if (bmi) score++
    if (age) score++
    if (neck) score++
    if (gender) score++

    let risk = ''
    let severity = ''
    let recommendation = ''

    if (score <= 2) {
      risk = 'Low Risk'
      severity = 'Low probability of OSA'
      recommendation = 'Continue monitoring symptoms. Consider sleep study if symptoms worsen'
    } else if (score >= 3 && score <= 4) {
      risk = 'Intermediate Risk'
      severity = 'Intermediate probability of OSA'
      recommendation = 'Sleep study recommended to confirm diagnosis'
    } else if (score >= 5) {
      risk = 'High Risk'
      severity = 'High probability of moderate to severe OSA'
      recommendation = 'Sleep study strongly recommended. High likelihood of needing CPAP therapy'
    }

    setResult({ score, risk, severity, recommendation })
  }

  const resetCalculator = () => {
    setSnoring(false)
    setTired(false)
    setObserved(false)
    setPressure(false)
    setBmi(false)
    setAge(false)
    setNeck(false)
    setGender(false)
    setResult(null)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Obstructive Sleep Apnea (OSA)</h1>
        <p className="text-lg text-muted-foreground">
          Understanding risk factors, STOP-BANG screening, and treatment principles
        </p>
      </div>

      {/* Educational Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pathophysiology of OSA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Obstructive Sleep Apnea is characterized by repetitive episodes of upper airway collapse during sleep, leading to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm ml-4">
            <li><strong>Airway obstruction:</strong> Collapse of pharyngeal airway during sleep</li>
            <li><strong>Oxygen desaturation:</strong> Intermittent hypoxemia</li>
            <li><strong>Sleep fragmentation:</strong> Frequent micro-arousals</li>
            <li><strong>Sympathetic activation:</strong> Increased cardiovascular stress</li>
            <li><strong>Daytime consequences:</strong> Excessive sleepiness, cognitive impairment</li>
          </ul>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Major Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Obesity:</strong> Most significant modifiable risk factor</li>
              <li><strong>Male gender:</strong> 2-3x higher prevalence</li>
              <li><strong>Age:</strong> Increases with age (peak 50-60 years)</li>
              <li><strong>Neck circumference:</strong> &gt;17" (men), &gt;16" (women)</li>
              <li><strong>Craniofacial abnormalities:</strong> Retrognathia, macroglossia</li>
              <li><strong>Family history:</strong> Genetic predisposition</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clinical Presentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Nighttime Symptoms:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Loud snoring</li>
                  <li>Witnessed apneas</li>
                  <li>Gasping/choking episodes</li>
                  <li>Frequent awakenings</li>
                  <li>Nocturia</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Daytime Symptoms:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Excessive daytime sleepiness</li>
                  <li>Morning headaches</li>
                  <li>Difficulty concentrating</li>
                  <li>Mood changes/irritability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* STOP-BANG Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>STOP-BANG Questionnaire</CardTitle>
          <CardDescription>Validated screening tool for Obstructive Sleep Apnea risk assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">S - Snoring</p>
                <p className="text-sm text-muted-foreground">Do you snore loudly (louder than talking or loud enough to be heard through closed door)?</p>
              </div>
              <input
                type="checkbox"
                checked={snoring}
                onChange={(e) => setSnoring(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">T - Tired</p>
                <p className="text-sm text-muted-foreground">Do you often feel tired, fatigued, or sleepy during the daytime?</p>
              </div>
              <input
                type="checkbox"
                checked={tired}
                onChange={(e) => setTired(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">O - Observed</p>
                <p className="text-sm text-muted-foreground">Has anyone observed you stop breathing or choking/gasping during sleep?</p>
              </div>
              <input
                type="checkbox"
                checked={observed}
                onChange={(e) => setObserved(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">P - Pressure</p>
                <p className="text-sm text-muted-foreground">Do you have or are you being treated for high blood pressure?</p>
              </div>
              <input
                type="checkbox"
                checked={pressure}
                onChange={(e) => setPressure(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">B - BMI</p>
                <p className="text-sm text-muted-foreground">BMI &gt;35 kg/m²?</p>
              </div>
              <input
                type="checkbox"
                checked={bmi}
                onChange={(e) => setBmi(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">A - Age</p>
                <p className="text-sm text-muted-foreground">Age &gt;50 years?</p>
              </div>
              <input
                type="checkbox"
                checked={age}
                onChange={(e) => setAge(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">N - Neck</p>
                <p className="text-sm text-muted-foreground">Neck circumference &gt;17 inches (male) or &gt;16 inches (female)?</p>
              </div>
              <input
                type="checkbox"
                checked={neck}
                onChange={(e) => setNeck(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">G - Gender</p>
                <p className="text-sm text-muted-foreground">Male gender?</p>
              </div>
              <input
                type="checkbox"
                checked={gender}
                onChange={(e) => setGender(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={calculateSTOPBANG} className="flex-1">
              Calculate STOP-BANG Score
            </Button>
            <Button onClick={resetCalculator} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>

          {result && (
            <div className="p-6 rounded-lg border-2 bg-muted">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-primary">{result.score}</div>
                <div className="text-sm text-muted-foreground">out of 8 points</div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background">
                  <span className="font-semibold">Risk Level: </span>
                  <span className={
                    result.risk === 'Low Risk' ? 'text-green-600 dark:text-green-400' :
                    result.risk === 'Intermediate Risk' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }>
                    {result.risk}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-background">
                  <span className="font-semibold">Severity: </span>
                  <span>{result.severity}</span>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary">
                  <p className="font-semibold mb-2">Recommendation:</p>
                  <p className="text-sm">{result.recommendation}</p>
                </div>

                <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
                  <p className="text-sm">
                    <strong>Score Interpretation:</strong>
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>0-2: Low risk of OSA</li>
                    <li>3-4: Intermediate risk of OSA</li>
                    <li>5-8: High risk of moderate to severe OSA</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Severity Classification */}
      <Card>
        <CardHeader>
          <CardTitle>OSA Severity Classification</CardTitle>
          <CardDescription>Based on Apnea-Hypopnea Index (AHI) from sleep study</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Mild OSA</h4>
              <p className="text-sm">AHI: 5-15 events/hour</p>
              <p className="text-sm mt-1">May benefit from lifestyle modifications ± CPAP</p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Moderate OSA</h4>
              <p className="text-sm">AHI: 15-30 events/hour</p>
              <p className="text-sm mt-1">CPAP therapy typically recommended</p>
            </div>

            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Severe OSA</h4>
              <p className="text-sm">AHI: &gt;30 events/hour</p>
              <p className="text-sm mt-1">CPAP therapy strongly recommended; high risk of complications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Principles (Educational)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">CPAP (Continuous Positive Airway Pressure)</h4>
              <p className="text-sm mb-2"><strong>First-line therapy for moderate to severe OSA</strong></p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Provides pneumatic splint to keep airway open</li>
                <li>Eliminates apneas and hypopneas</li>
                <li>Improves oxygenation and sleep quality</li>
                <li>Adherence critical for success (≥4 hours/night)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Lifestyle Modifications</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li><strong>Weight loss:</strong> Most effective modifiable factor; 10% weight loss can reduce AHI by 30%</li>
                <li><strong>Positional therapy:</strong> Avoid supine sleeping if position-dependent OSA</li>
                <li><strong>Avoid alcohol/sedatives:</strong> Worsen airway collapsibility</li>
                <li><strong>Sleep hygiene:</strong> Regular sleep schedule</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Alternative/Adjunctive Therapies</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li><strong>Oral appliances:</strong> Mandibular advancement devices (mild-moderate OSA)</li>
                <li><strong>Surgery:</strong> Uvulopalatopharyngoplasty (UPPP), maxillomandibular advancement</li>
                <li><strong>Hypoglossal nerve stimulation:</strong> For select patients intolerant to CPAP</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complications */}
      <Card>
        <CardHeader>
          <CardTitle>OSA Complications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Cardiovascular</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Hypertension (most common)</li>
                <li>Coronary artery disease</li>
                <li>Arrhythmias (especially atrial fibrillation)</li>
                <li>Heart failure</li>
                <li>Stroke</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Metabolic/Other</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Type 2 diabetes/insulin resistance</li>
                <li>Metabolic syndrome</li>
                <li>Cognitive impairment</li>
                <li>Motor vehicle accidents (daytime sleepiness)</li>
                <li>Depression</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* When Sleep Studies Needed */}
      <Card>
        <CardHeader>
          <CardTitle>When Sleep Studies Are Indicated</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>High clinical suspicion or high STOP-BANG score (≥3)</li>
            <li>Witnessed apneas or significant daytime sleepiness</li>
            <li>Refractory hypertension</li>
            <li>Atrial fibrillation (especially recurrent after cardioversion)</li>
            <li>Prior to bariatric surgery</li>
            <li>Professional drivers or safety-sensitive occupations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
