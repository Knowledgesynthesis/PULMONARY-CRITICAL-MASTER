import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PulmonaryEmbolism() {
  // Wells Score Calculator
  const [clinicalSigns, setClinicalSigns] = useState(false)
  const [peMoreLikely, setPeMoreLikely] = useState(false)
  const [heartRate, setHeartRate] = useState(false)
  const [immobilization, setImmobilization] = useState(false)
  const [previousPEDVT, setPreviousPEDVT] = useState(false)
  const [hemoptysis, setHemoptysis] = useState(false)
  const [malignancy, setMalignancy] = useState(false)
  const [wellsResult, setWellsResult] = useState<any>(null)

  // PERC Rule
  const [age50, setAge50] = useState(false)
  const [hr100, setHr100] = useState(false)
  const [spo292, setSpo292] = useState(false)
  const [hemoptysisPerc, setHemoptysisPerc] = useState(false)
  const [estrogen, setEstrogen] = useState(false)
  const [priorPEDVT, setPriorPEDVT] = useState(false)
  const [surgery, setSurgery] = useState(false)
  const [unilateralLegSwelling, setUnilateralLegSwelling] = useState(false)
  const [percResult, setPercResult] = useState<any>(null)

  const calculateWells = () => {
    let score = 0
    if (clinicalSigns) score += 3
    if (peMoreLikely) score += 3
    if (heartRate) score += 1.5
    if (immobilization) score += 1.5
    if (previousPEDVT) score += 1.5
    if (hemoptysis) score += 1
    if (malignancy) score += 1

    let probability = ''
    let recommendation = ''

    if (score < 2) {
      probability = 'Low'
      recommendation = 'PE unlikely. Consider PERC rule or D-dimer if PERC positive'
    } else if (score >= 2 && score <= 6) {
      probability = 'Moderate'
      recommendation = 'Consider D-dimer. If elevated, proceed to CTPA'
    } else {
      probability = 'High'
      recommendation = 'High pre-test probability. Proceed directly to CTPA (avoid D-dimer in high-risk)'
    }

    setWellsResult({ score, probability, recommendation })
  }

  const calculatePERC = () => {
    const positiveCount = [
      age50, hr100, spo292, hemoptysisPerc, estrogen, priorPEDVT, surgery, unilateralLegSwelling
    ].filter(Boolean).length

    let result = ''
    let recommendation = ''

    if (positiveCount === 0) {
      result = 'PERC Negative'
      recommendation = 'PE can be safely ruled out. No further testing needed (in low-risk patients)'
    } else {
      result = 'PERC Positive'
      recommendation = 'Cannot rule out PE with PERC. Proceed to Wells score and/or D-dimer'
    }

    setPercResult({ positiveCount, result, recommendation })
  }

  const resetWells = () => {
    setClinicalSigns(false)
    setPeMoreLikely(false)
    setHeartRate(false)
    setImmobilization(false)
    setPreviousPEDVT(false)
    setHemoptysis(false)
    setMalignancy(false)
    setWellsResult(null)
  }

  const resetPerc = () => {
    setAge50(false)
    setHr100(false)
    setSpo292(false)
    setHemoptysisPerc(false)
    setEstrogen(false)
    setPriorPEDVT(false)
    setSurgery(false)
    setUnilateralLegSwelling(false)
    setPercResult(null)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Pulmonary Embolism (PE)</h1>
        <p className="text-lg text-muted-foreground">
          Master Wells score, PERC rule, imaging strategies, and hemodynamic classification
        </p>
      </div>

      {/* Educational Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pathophysiology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Pulmonary embolism occurs when a thrombus (usually from deep veins) travels to the pulmonary arterial circulation, causing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm ml-4">
            <li><strong>Increased dead space:</strong> Ventilation without perfusion</li>
            <li><strong>Hypoxemia:</strong> V/Q mismatch and right-to-left shunting</li>
            <li><strong>Increased RV afterload:</strong> Pulmonary vascular obstruction</li>
            <li><strong>RV dysfunction:</strong> Can lead to hemodynamic collapse</li>
          </ul>
        </CardContent>
      </Card>

      {/* Hemodynamic Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Hemodynamic Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Massive PE (High-Risk)</h4>
              <p className="text-sm mb-2">Hemodynamically unstable: hypotension, shock, or cardiac arrest</p>
              <p className="text-sm"><strong>Management:</strong> Thrombolysis or embolectomy consideration (educational)</p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Submassive PE (Intermediate-Risk)</h4>
              <p className="text-sm mb-2">Hemodynamically stable but with RV dysfunction or myocardial necrosis</p>
              <p className="text-sm"><strong>Management:</strong> Anticoagulation, monitor closely, selective thrombolysis</p>
            </div>

            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Low-Risk PE</h4>
              <p className="text-sm mb-2">Hemodynamically stable, no RV dysfunction</p>
              <p className="text-sm"><strong>Management:</strong> Anticoagulation, consider outpatient treatment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wells Score Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Wells Score for PE</CardTitle>
          <CardDescription>Calculate pre-test probability (educational tool)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">Clinical signs/symptoms of DVT</p>
                <p className="text-sm text-muted-foreground">Leg swelling, pain, etc. (3 points)</p>
              </div>
              <input
                type="checkbox"
                checked={clinicalSigns}
                onChange={(e) => setClinicalSigns(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">PE is #1 diagnosis OR equally likely</p>
                <p className="text-sm text-muted-foreground">No alternative diagnosis more likely (3 points)</p>
              </div>
              <input
                type="checkbox"
                checked={peMoreLikely}
                onChange={(e) => setPeMoreLikely(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">Heart rate &gt;100 bpm</p>
                <p className="text-sm text-muted-foreground">Tachycardia (1.5 points)</p>
              </div>
              <input
                type="checkbox"
                checked={heartRate}
                onChange={(e) => setHeartRate(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">Immobilization ≥3 days or surgery in past 4 weeks</p>
                <p className="text-sm text-muted-foreground">Risk factor (1.5 points)</p>
              </div>
              <input
                type="checkbox"
                checked={immobilization}
                onChange={(e) => setImmobilization(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">Previous PE or DVT</p>
                <p className="text-sm text-muted-foreground">Past history (1.5 points)</p>
              </div>
              <input
                type="checkbox"
                checked={previousPEDVT}
                onChange={(e) => setPreviousPEDVT(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">Hemoptysis</p>
                <p className="text-sm text-muted-foreground">Coughing blood (1 point)</p>
              </div>
              <input
                type="checkbox"
                checked={hemoptysis}
                onChange={(e) => setHemoptysis(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <div className="flex-1">
                <p className="font-semibold">Malignancy</p>
                <p className="text-sm text-muted-foreground">Active cancer or treatment within 6 months (1 point)</p>
              </div>
              <input
                type="checkbox"
                checked={malignancy}
                onChange={(e) => setMalignancy(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={calculateWells} className="flex-1">
              Calculate Wells Score
            </Button>
            <Button onClick={resetWells} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>

          {wellsResult && (
            <div className="p-6 rounded-lg border-2 bg-muted">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-primary">{wellsResult.score}</div>
                <div className="text-sm text-muted-foreground">points</div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background">
                  <span className="font-semibold">Probability: </span>
                  <span className={
                    wellsResult.probability === 'Low' ? 'text-green-600 dark:text-green-400' :
                    wellsResult.probability === 'Moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }>
                    {wellsResult.probability}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary">
                  <p className="font-semibold mb-2">Recommendation:</p>
                  <p className="text-sm">{wellsResult.recommendation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* PERC Rule */}
      <Card>
        <CardHeader>
          <CardTitle>PERC Rule (Pulmonary Embolism Rule-out Criteria)</CardTitle>
          <CardDescription>Used in LOW-RISK patients only to rule out PE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
            <p className="text-sm">
              <strong>Important:</strong> PERC should only be used in LOW clinical suspicion patients.
              If all criteria are absent (PERC negative), PE can be ruled out without further testing.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Age ≥50 years</p>
              <input
                type="checkbox"
                checked={age50}
                onChange={(e) => setAge50(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Heart rate ≥100 bpm</p>
              <input
                type="checkbox"
                checked={hr100}
                onChange={(e) => setHr100(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">SpO₂ &lt;95% on room air</p>
              <input
                type="checkbox"
                checked={spo292}
                onChange={(e) => setSpo292(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Hemoptysis</p>
              <input
                type="checkbox"
                checked={hemoptysisPerc}
                onChange={(e) => setHemoptysisPerc(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Estrogen use (oral contraceptives, HRT)</p>
              <input
                type="checkbox"
                checked={estrogen}
                onChange={(e) => setEstrogen(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Prior PE or DVT</p>
              <input
                type="checkbox"
                checked={priorPEDVT}
                onChange={(e) => setPriorPEDVT(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Surgery or trauma within 4 weeks</p>
              <input
                type="checkbox"
                checked={surgery}
                onChange={(e) => setSurgery(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
              <p className="font-semibold">Unilateral leg swelling</p>
              <input
                type="checkbox"
                checked={unilateralLegSwelling}
                onChange={(e) => setUnilateralLegSwelling(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={calculatePERC} className="flex-1">
              Calculate PERC
            </Button>
            <Button onClick={resetPerc} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>

          {percResult && (
            <div className="p-6 rounded-lg border-2 bg-muted">
              <h3 className="text-2xl font-bold mb-4">{percResult.result}</h3>
              <p className="mb-4">Positive criteria: {percResult.positiveCount} of 8</p>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary">
                <p className="font-semibold mb-2">Recommendation:</p>
                <p className="text-sm">{percResult.recommendation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Imaging Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Imaging Selection: CTPA vs V/Q</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">CTPA (CT Pulmonary Angiography)</h4>
              <p className="text-sm mb-2"><strong>Preferred when:</strong></p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>First-line imaging for most patients</li>
                <li>Chest X-ray abnormalities present</li>
                <li>Need to evaluate alternative diagnoses</li>
                <li>Better sensitivity and specificity</li>
              </ul>
              <p className="text-sm mt-2"><strong>Contraindications:</strong></p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Severe renal insufficiency</li>
                <li>Contrast allergy</li>
                <li>Pregnancy (relative)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">V/Q Scan (Ventilation-Perfusion)</h4>
              <p className="text-sm mb-2"><strong>Preferred when:</strong></p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Renal insufficiency (avoid contrast)</li>
                <li>Contrast allergy</li>
                <li>Pregnancy (lower radiation)</li>
                <li>Normal chest X-ray</li>
              </ul>
              <p className="text-sm mt-2"><strong>Results:</strong></p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>High probability → treat for PE</li>
                <li>Low probability → PE unlikely</li>
                <li>Intermediate → often non-diagnostic, need further testing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* D-Dimer Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>D-Dimer Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">D-Dimer Negative</h4>
              <p className="text-sm">In low to moderate probability patients: PE effectively ruled out, no imaging needed</p>
            </div>

            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">D-Dimer Positive</h4>
              <p className="text-sm">Non-specific. Proceed to imaging (CTPA or V/Q)</p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ Critical Pearl</h4>
              <p className="text-sm">
                <strong>Avoid D-dimer in HIGH pre-test probability.</strong> High Wells score (&gt;6) should proceed directly to CTPA.
                D-dimer is often elevated and will delay diagnosis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anticoagulation Basics */}
      <Card>
        <CardHeader>
          <CardTitle>Anticoagulation Basics (Educational)</CardTitle>
          <CardDescription>Conceptual framework - not for clinical dosing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm"><strong>Initial anticoagulation options:</strong></p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Low molecular weight heparin (educational)</li>
              <li>Unfractionated heparin (for unstable patients)</li>
              <li>Direct oral anticoagulants (DOACs) - educational concept</li>
            </ul>
            <p className="text-sm mt-3"><strong>Duration:</strong> Minimum 3 months; longer if provoked risk factors persist</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
