import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Asthma() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [peakFlow, setPeakFlow] = useState<string>('')
  const [severity, setSeverity] = useState<string | null>(null)

  const symptoms = [
    { id: 'wheezing', label: 'Wheezing' },
    { id: 'sob_rest', label: 'Shortness of breath at rest' },
    { id: 'sob_activity', label: 'Shortness of breath with activity' },
    { id: 'chest_tight', label: 'Chest tightness' },
    { id: 'speak_sentences', label: 'Can only speak in sentences' },
    { id: 'speak_words', label: 'Can only speak in words' },
    { id: 'accessory', label: 'Using accessory muscles' },
    { id: 'altered', label: 'Altered mental status' },
  ]

  const calculateSeverity = () => {
    const severeSymptoms = ['speak_words', 'accessory', 'altered']
    const hasSevereSymptoms = severeSymptoms.some(s => selectedSymptoms.includes(s))

    const peakFlowNum = parseInt(peakFlow)

    if (hasSevereSymptoms || peakFlowNum < 40) {
      setSeverity('severe')
    } else if (selectedSymptoms.includes('speak_sentences') || (peakFlowNum >= 40 && peakFlowNum < 60)) {
      setSeverity('moderate')
    } else if (selectedSymptoms.includes('sob_activity') || peakFlowNum >= 60) {
      setSeverity('mild')
    } else {
      setSeverity('mild')
    }
  }

  const getSeverityColor = () => {
    switch (severity) {
      case 'severe': return 'bg-red-100 dark:bg-red-900/20 border-red-500'
      case 'moderate': return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500'
      case 'mild': return 'bg-green-100 dark:bg-green-900/20 border-green-500'
      default: return ''
    }
  }

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Asthma Exacerbation</h1>
        <p className="text-lg text-muted-foreground">
          Learn to assess severity and manage acute asthma exacerbations
        </p>
      </div>

      {/* Educational Content */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pathophysiology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>Asthma exacerbations involve:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Airway inflammation:</strong> Bronchial wall edema and mucus production</li>
              <li><strong>Bronchospasm:</strong> Smooth muscle constriction</li>
              <li><strong>Air trapping:</strong> Increased residual volume</li>
              <li><strong>V/Q mismatch:</strong> Leading to hypoxemia</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Red Flags - ICU Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Altered mental status or confusion</li>
              <li>Silent chest (minimal air movement)</li>
              <li>Inability to speak</li>
              <li>Cyanosis</li>
              <li>Peak flow &lt;25% predicted</li>
              <li>Bradycardia or hypotension</li>
              <li>Respiratory acidosis (PaCO₂ &gt;45 mmHg)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Peak Flow Zones */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Flow Zones</CardTitle>
          <CardDescription>Educational reference for severity assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500">
              <h3 className="font-semibold text-green-800 dark:text-green-300">Green Zone: 80-100% of personal best</h3>
              <p className="text-sm mt-2">Good control - continue maintenance therapy</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Yellow Zone: 60-80% of personal best</h3>
              <p className="text-sm mt-2">Moderate exacerbation - consider increasing treatment</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-100 dark:bg-orange-900/20 border border-orange-500">
              <h3 className="font-semibold text-orange-800 dark:text-orange-300">Orange Zone: 40-60% of personal best</h3>
              <p className="text-sm mt-2">Moderate to severe - requires immediate intervention</p>
            </div>
            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
              <h3 className="font-semibold text-red-800 dark:text-red-300">Red Zone: &lt;40% of personal best</h3>
              <p className="text-sm mt-2">Severe exacerbation - emergency care needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Severity Sorter */}
      <Card>
        <CardHeader>
          <CardTitle>Asthma Severity Sorter</CardTitle>
          <CardDescription>Interactive tool to determine exacerbation severity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Select Present Symptoms:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {symptoms.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedSymptoms.includes(symptom.id)
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
            <label className="font-semibold mb-2 block">Peak Flow (% of predicted):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={peakFlow}
              onChange={(e) => setPeakFlow(e.target.value)}
              placeholder="Enter peak flow %"
              className="w-full p-3 rounded-lg border-2 border-border bg-background"
            />
          </div>

          <Button onClick={calculateSeverity} className="w-full">
            Calculate Severity
          </Button>

          {severity && (
            <div className={`p-6 rounded-lg border-2 ${getSeverityColor()}`}>
              <h3 className="text-2xl font-bold mb-4 capitalize">{severity} Exacerbation</h3>
              {severity === 'mild' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Management:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Short-acting beta-2 agonist (SABA) every 4-6 hours</li>
                    <li>Continue controller medications</li>
                    <li>Monitor symptoms closely</li>
                    <li>Outpatient management typically appropriate</li>
                  </ul>
                </div>
              )}
              {severity === 'moderate' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Management:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>SABA every 1-2 hours initially</li>
                    <li>Systemic corticosteroids (educational)</li>
                    <li>Oxygen to maintain SpO₂ ≥90%</li>
                    <li>Consider ED evaluation</li>
                    <li>May require hospitalization</li>
                  </ul>
                </div>
              )}
              {severity === 'severe' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Management:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-red-600 dark:text-red-400">EMERGENCY - Immediate ED care required</strong></li>
                    <li>Continuous nebulized SABA</li>
                    <li>Ipratropium bromide added to SABA</li>
                    <li>Systemic corticosteroids IV (educational)</li>
                    <li>High-flow oxygen</li>
                    <li>Consider magnesium sulfate</li>
                    <li>ICU consultation if no rapid improvement</li>
                    <li>Avoid NIPPV in asthma (typically not indicated)</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Differentiation from COPD */}
      <Card>
        <CardHeader>
          <CardTitle>Asthma vs COPD Differentiation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3">Feature</th>
                  <th className="text-left p-3">Asthma</th>
                  <th className="text-left p-3">COPD</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-medium">Age of onset</td>
                  <td className="p-3">Often childhood/young adult</td>
                  <td className="p-3">Usually &gt;40 years</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Smoking history</td>
                  <td className="p-3">Not necessary</td>
                  <td className="p-3">Usually &gt;10 pack-years</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Reversibility</td>
                  <td className="p-3">Largely reversible</td>
                  <td className="p-3">Largely irreversible</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Symptom pattern</td>
                  <td className="p-3">Variable, often nocturnal</td>
                  <td className="p-3">Progressive, persistent</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Allergy history</td>
                  <td className="p-3">Common</td>
                  <td className="p-3">Uncommon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
