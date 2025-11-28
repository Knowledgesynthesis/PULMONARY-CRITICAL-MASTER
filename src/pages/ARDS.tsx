import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ARDS() {
  const [paO2, setPaO2] = useState<string>('')
  const [fiO2, setFiO2] = useState<string>('')
  const [timing, setTiming] = useState<string>('')
  const [infiltrates, setInfiltrates] = useState<string>('')
  const [ardsResult, setArdsResult] = useState<any>(null)

  const assessARDS = () => {
    const paO2Num = parseFloat(paO2)
    const fiO2Num = parseFloat(fiO2)
    const ratio = paO2Num / fiO2Num

    let severity = ''
    let ventStrategy = ''
    let peepRange = ''
    let mortality = ''

    if (ratio > 300) {
      severity = 'Not ARDS'
      ventStrategy = 'Standard ventilation principles'
      peepRange = 'N/A'
      mortality = 'N/A'
    } else if (ratio > 200 && ratio <= 300) {
      severity = 'Mild ARDS'
      ventStrategy = 'Lung-protective ventilation'
      peepRange = '5-10 cm H₂O (educational concept)'
      mortality = '~27%'
    } else if (ratio > 100 && ratio <= 200) {
      severity = 'Moderate ARDS'
      ventStrategy = 'Lung-protective ventilation + higher PEEP'
      peepRange = '10-15 cm H₂O (educational concept)'
      mortality = '~32%'
    } else if (ratio <= 100) {
      severity = 'Severe ARDS'
      ventStrategy = 'Lung-protective ventilation + high PEEP + consider proning'
      peepRange = '15+ cm H₂O (educational concept)'
      mortality = '~45%'
    }

    const meetsTiming = timing === 'within_week'
    const meetsBilateral = infiltrates === 'bilateral'

    setArdsResult({
      ratio: ratio.toFixed(1),
      severity,
      ventStrategy,
      peepRange,
      mortality,
      meetsTiming,
      meetsBilateral,
    })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">ARDS (Acute Respiratory Distress Syndrome)</h1>
        <p className="text-lg text-muted-foreground">
          Berlin definition, severity classification, and lung-protective ventilation principles
        </p>
      </div>

      {/* Berlin Definition */}
      <Card>
        <CardHeader>
          <CardTitle>Berlin Definition of ARDS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">1. Timing</h4>
              <p className="text-sm">Within 1 week of known clinical insult or new/worsening respiratory symptoms</p>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">2. Chest Imaging</h4>
              <p className="text-sm">Bilateral opacities not fully explained by effusions, lobar/lung collapse, or nodules</p>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">3. Origin of Edema</h4>
              <p className="text-sm">Respiratory failure not fully explained by cardiac failure or fluid overload</p>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">4. Oxygenation (PaO₂/FiO₂ ratio)</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4 mt-2">
                <li><strong>Mild:</strong> 200-300 mmHg (with PEEP ≥5)</li>
                <li><strong>Moderate:</strong> 100-200 mmHg (with PEEP ≥5)</li>
                <li><strong>Severe:</strong> ≤100 mmHg (with PEEP ≥5)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Causes */}
      <Card>
        <CardHeader>
          <CardTitle>Common Causes of ARDS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Direct Lung Injury</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Pneumonia (most common)</li>
                <li>Aspiration</li>
                <li>Inhalational injury</li>
                <li>Lung contusion</li>
                <li>Near-drowning</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Indirect Lung Injury</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Sepsis (most common indirect cause)</li>
                <li>Severe trauma</li>
                <li>Pancreatitis</li>
                <li>Multiple transfusions (TRALI)</li>
                <li>Drug overdose</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ARDS Ventilation Simulator */}
      <Card>
        <CardHeader>
          <CardTitle>ARDS Severity Calculator</CardTitle>
          <CardDescription>Calculate PaO₂/FiO₂ ratio and determine severity (educational tool)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-2 block">PaO₂ (mmHg):</label>
              <input
                type="number"
                min="40"
                max="500"
                value={paO2}
                onChange={(e) => setPaO2(e.target.value)}
                placeholder="e.g., 80"
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 block">FiO₂ (decimal):</label>
              <input
                type="number"
                step="0.01"
                min="0.21"
                max="1.0"
                value={fiO2}
                onChange={(e) => setFiO2(e.target.value)}
                placeholder="e.g., 0.60 (60%)"
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">Enter as decimal (e.g., 0.60 for 60% oxygen)</p>
            </div>

            <div>
              <label className="font-semibold mb-2 block">Timing:</label>
              <select
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              >
                <option value="">Select timing</option>
                <option value="within_week">Within 1 week of insult</option>
                <option value="over_week">More than 1 week</option>
              </select>
            </div>

            <div>
              <label className="font-semibold mb-2 block">Chest Imaging:</label>
              <select
                value={infiltrates}
                onChange={(e) => setInfiltrates(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-border bg-background"
              >
                <option value="">Select findings</option>
                <option value="bilateral">Bilateral opacities</option>
                <option value="unilateral">Unilateral opacity</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>

          <Button onClick={assessARDS} className="w-full">
            Calculate ARDS Severity
          </Button>

          {ardsResult && (
            <div className="space-y-4">
              <div className="p-6 rounded-lg border-2 bg-muted">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-primary">{ardsResult.ratio}</div>
                  <div className="text-sm text-muted-foreground">PaO₂/FiO₂ ratio</div>
                </div>

                <div className="text-center mb-4">
                  <div className={`text-2xl font-bold ${
                    ardsResult.severity === 'Severe ARDS' ? 'text-red-600 dark:text-red-400' :
                    ardsResult.severity === 'Moderate ARDS' ? 'text-yellow-600 dark:text-yellow-400' :
                    ardsResult.severity === 'Mild ARDS' ? 'text-orange-600 dark:text-orange-400' :
                    'text-green-600 dark:text-green-400'
                  }`}>
                    {ardsResult.severity}
                  </div>
                </div>

                {!ardsResult.meetsTiming && (
                  <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500 mb-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      ⚠️ Timing criteria not met for Berlin definition
                    </p>
                  </div>
                )}

                {!ardsResult.meetsBilateral && (
                  <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500 mb-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      ⚠️ Bilateral opacities required for ARDS diagnosis
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {ardsResult.mortality !== 'N/A' && (
                    <div className="p-3 rounded-lg bg-background">
                      <span className="font-semibold">Mortality: </span>
                      <span>{ardsResult.mortality}</span>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-background">
                    <span className="font-semibold">Ventilation Strategy: </span>
                    <span>{ardsResult.ventStrategy}</span>
                  </div>

                  {ardsResult.peepRange !== 'N/A' && (
                    <div className="p-3 rounded-lg bg-background">
                      <span className="font-semibold">Typical PEEP Range: </span>
                      <span>{ardsResult.peepRange}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lung-Protective Ventilation */}
      <Card>
        <CardHeader>
          <CardTitle>Lung-Protective Ventilation Principles (Educational)</CardTitle>
          <CardDescription>Based on ARDSNet protocol concepts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Low Tidal Volume Strategy</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Target: 6 mL/kg predicted body weight (educational concept)</li>
                <li>Prevents volutrauma (overdistension)</li>
                <li>Reduces ventilator-induced lung injury (VILI)</li>
                <li>Allows permissive hypercapnia if needed</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Plateau Pressure Limitation</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Target: Plateau pressure &lt;30 cm H₂O (educational concept)</li>
                <li>Prevents barotrauma</li>
                <li>Measured during inspiratory hold maneuver</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/20 border border-purple-500">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">PEEP Optimization</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Prevents atelectrauma (repetitive opening/closing)</li>
                <li>Improves oxygenation</li>
                <li>Higher PEEP for moderate-severe ARDS</li>
                <li>Balance: enough PEEP to recruit alveoli, not too much to overdistend</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-orange-100 dark:bg-orange-900/20 border border-orange-500">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">FiO₂ Titration</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Target SpO₂: 88-95% (educational target)</li>
                <li>Minimize oxygen toxicity</li>
                <li>Use PEEP-FiO₂ tables for guidance (educational)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prone Positioning */}
      <Card>
        <CardHeader>
          <CardTitle>Prone Positioning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              <strong>Indication:</strong> Severe ARDS (PaO₂/FiO₂ &lt;150) despite lung-protective ventilation
            </p>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Improves V/Q matching</li>
                <li>More homogeneous distribution of ventilation</li>
                <li>Reduces dorsal atelectasis</li>
                <li>Mortality benefit in severe ARDS</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">Typical Protocol (Educational):</h4>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>16 hours prone, 8 hours supine</li>
                <li>Continue until PaO₂/FiO₂ improves</li>
                <li>Requires specialized team and equipment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Pitfalls */}
      <Card>
        <CardHeader>
          <CardTitle>Common Pitfalls in ARDS Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Using high tidal volumes:</strong> Increases VILI and mortality</li>
            <li><strong>Over-aggressive fluid resuscitation:</strong> Worsens pulmonary edema</li>
            <li><strong>Delayed prone positioning:</strong> Proning works best when started early in severe ARDS</li>
            <li><strong>Excessive oxygen:</strong> FiO₂ 1.0 not always necessary; use PEEP to recruit lung</li>
            <li><strong>Missing the underlying cause:</strong> Treat sepsis, drain empyema, etc.</li>
            <li><strong>Plateau pressure &gt;30:</strong> Increases risk of barotrauma</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
