import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CaseScenario {
  id: string
  title: string
  category: string
  description: string
  presentation: string
  questions: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    nextStep?: string
  }[]
}

const cases: CaseScenario[] = [
  {
    id: 'case-1',
    title: 'Acute Dyspnea in the ED',
    category: 'Asthma vs COPD',
    description: 'A challenging case of acute respiratory distress requiring rapid differentiation',
    presentation: '45-year-old female presents with acute onset dyspnea, wheezing, and chest tightness. History of seasonal allergies. Non-smoker. Vitals: HR 110, RR 28, SpO₂ 91% on room air, BP 135/85. Exam shows diffuse wheezing, speaking in short sentences.',
    questions: [
      {
        id: 1,
        question: 'What is your initial priority?',
        options: [
          'Order chest X-ray',
          'Administer supplemental oxygen and bronchodilators',
          'Obtain arterial blood gas',
          'Start antibiotics'
        ],
        correctAnswer: 1,
        explanation: 'Initial stabilization with oxygen and bronchodilators is the priority in acute bronchospasm. ABCs come first.',
        nextStep: 'Patient receives albuterol nebulizer and oxygen. SpO₂ improves to 94%. Peak flow is 60% of predicted.'
      },
      {
        id: 2,
        question: 'Based on peak flow 60% of predicted and current symptoms, what is the severity?',
        options: [
          'Mild exacerbation',
          'Moderate exacerbation',
          'Severe exacerbation',
          'Life-threatening exacerbation'
        ],
        correctAnswer: 1,
        explanation: 'Peak flow 40-69% with moderate symptoms indicates moderate exacerbation. Requires aggressive treatment but not ICU-level care yet.',
        nextStep: 'You diagnose moderate asthma exacerbation and initiate appropriate therapy.'
      },
      {
        id: 3,
        question: 'What additional treatment should be added?',
        options: [
          'NIPPV',
          'Systemic corticosteroids',
          'Intubation',
          'Magnesium sulfate'
        ],
        correctAnswer: 1,
        explanation: 'Systemic corticosteroids are indicated for moderate to severe asthma exacerbations. They reduce inflammation and speed recovery.',
        nextStep: 'Patient improves with treatment. Peak flow increases to 75%. She is ready for disposition planning.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Hypercapnic Respiratory Failure',
    category: 'COPD',
    description: 'Managing acute COPD exacerbation with respiratory acidosis',
    presentation: '68-year-old male with COPD presents with worsening dyspnea over 3 days. Increased sputum production (yellow-green). Smoker 50 pack-years. Vitals: HR 105, RR 32, SpO₂ 85% on room air, BP 145/90. ABG: pH 7.28, PaCO₂ 68, PaO₂ 55, HCO₃ 28.',
    questions: [
      {
        id: 1,
        question: 'What is the acid-base disturbance?',
        options: [
          'Metabolic acidosis',
          'Respiratory alkalosis',
          'Acute respiratory acidosis',
          'Compensated respiratory acidosis'
        ],
        correctAnswer: 2,
        explanation: 'pH <7.35 with elevated PaCO₂ indicates respiratory acidosis. The normal HCO₃ suggests this is acute (no metabolic compensation yet).',
        nextStep: 'You recognize acute hypercapnic respiratory failure. What is your oxygen target?'
      },
      {
        id: 2,
        question: 'What is the appropriate oxygen saturation target?',
        options: [
          'SpO₂ 95-100%',
          'SpO₂ 88-92%',
          'SpO₂ 85-88%',
          'No supplemental oxygen needed'
        ],
        correctAnswer: 1,
        explanation: 'In COPD patients with hypercapnia, target SpO₂ 88-92%. Excessive oxygen can worsen CO₂ retention by reducing hypoxic drive.',
        nextStep: 'You titrate oxygen to SpO₂ 90%. Patient remains tachypneic with pH 7.28. Mental status is sleepy but arousable.'
      },
      {
        id: 3,
        question: 'What is the next best intervention?',
        options: [
          'Immediate intubation',
          'Initiate NIPPV (BiPAP)',
          'Increase oxygen to 100%',
          'Observe and reassess in 2 hours'
        ],
        correctAnswer: 1,
        explanation: 'NIPPV is indicated for hypercapnic respiratory failure (pH <7.35, PaCO₂ >45) in patients who can protect their airway. This can prevent intubation.',
        nextStep: 'NIPPV initiated with improvement in respiratory effort and ABG. Case resolved successfully!'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Febrile Pneumonia Decision',
    category: 'Pneumonia',
    description: 'Determining appropriate disposition for community-acquired pneumonia',
    presentation: '72-year-old female with 4-day history of cough, fever (38.9°C), and dyspnea. No recent hospitalizations. Vitals: HR 95, RR 24, SpO₂ 93% on RA, BP 110/70. Chest X-ray shows right lower lobe infiltrate. Labs: WBC 14,000, BUN 22 mg/dL.',
    questions: [
      {
        id: 1,
        question: 'Calculate the CURB-65 score: Age ≥65 (yes), Confusion (no), BUN >19 (yes), RR ≥30 (no), BP low (no)',
        options: [
          'CURB-65 = 1',
          'CURB-65 = 2',
          'CURB-65 = 3',
          'CURB-65 = 4'
        ],
        correctAnswer: 1,
        explanation: 'Age ≥65 (1 point) + BUN >19 (1 point) = CURB-65 score of 2. This indicates moderate risk.',
        nextStep: 'CURB-65 score is 2, suggesting moderate risk with ~9% 30-day mortality.'
      },
      {
        id: 2,
        question: 'What is the appropriate disposition?',
        options: [
          'Outpatient treatment with oral antibiotics',
          'Admission to general medical floor',
          'Direct ICU admission',
          'Observation unit only'
        ],
        correctAnswer: 1,
        explanation: 'CURB-65 score of 2 warrants consideration for inpatient admission or closely monitored outpatient therapy. Given age and comorbidities, admission is reasonable.',
        nextStep: 'Patient admitted to medical floor. What type of pneumonia is this?'
      },
      {
        id: 3,
        question: 'How would you classify this pneumonia?',
        options: [
          'Hospital-Acquired Pneumonia (HAP)',
          'Ventilator-Associated Pneumonia (VAP)',
          'Community-Acquired Pneumonia (CAP)',
          'Healthcare-Associated Pneumonia (HCAP)'
        ],
        correctAnswer: 2,
        explanation: 'Symptom onset before hospital admission with no recent healthcare exposure = Community-Acquired Pneumonia (CAP).',
        nextStep: 'CAP diagnosis confirmed. Appropriate antibiotic therapy initiated. Case complete!'
      }
    ]
  },
  {
    id: 'case-4',
    title: 'Chest Pain and Dyspnea',
    category: 'Pulmonary Embolism',
    description: 'Working up a patient with suspected pulmonary embolism',
    presentation: '52-year-old male presents with sudden onset right-sided chest pain and dyspnea. Recent 8-hour flight from Europe 2 days ago. Vitals: HR 115, RR 22, SpO₂ 94% on RA, BP 125/80. Exam shows tachycardia, clear lungs, no leg swelling.',
    questions: [
      {
        id: 1,
        question: 'Should you calculate Wells score or PERC rule first?',
        options: [
          'Wells score - proceed directly',
          'PERC rule - to potentially rule out PE',
          'Skip both and order CTPA',
          'Order D-dimer without risk stratification'
        ],
        correctAnswer: 0,
        explanation: 'With clear clinical suspicion (recent travel, acute symptoms), Wells score is more appropriate. PERC is for LOW suspicion cases only.',
        nextStep: 'Wells Score: HR >100 (1.5), Recent surgery/immobilization - flight (1.5), No alternative diagnosis (3) = 6 points'
      },
      {
        id: 2,
        question: 'Wells score is 6 (high probability). What is the next step?',
        options: [
          'D-dimer testing',
          'V/Q scan',
          'CTPA (CT pulmonary angiography)',
          'Lower extremity ultrasound'
        ],
        correctAnswer: 2,
        explanation: 'High Wells score (>6) should proceed directly to CTPA. D-dimer is often elevated and would delay diagnosis without adding value.',
        nextStep: 'CTPA shows large right-sided pulmonary embolism. Patient remains hemodynamically stable.'
      },
      {
        id: 3,
        question: 'How would you classify this PE?',
        options: [
          'Massive PE (requires thrombolysis)',
          'Submassive PE',
          'Low-risk PE',
          'Chronic PE'
        ],
        correctAnswer: 2,
        explanation: 'Hemodynamically stable patient with large PE but no RV dysfunction signs = Low-risk PE. Start anticoagulation, no thrombolysis needed.',
        nextStep: 'Anticoagulation initiated. Patient improving. Case resolved!'
      }
    ]
  }
]

export function Cases() {
  const [selectedCase, setSelectedCase] = useState<CaseScenario | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleCaseSelect = (caseScenario: CaseScenario) => {
    setSelectedCase(caseScenario)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (selectedCase && currentQuestion < selectedCase.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleResetCase = () => {
    setSelectedCase(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  if (selectedCase) {
    const question = selectedCase.questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer
    const isLastQuestion = currentQuestion === selectedCase.questions.length - 1

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={handleResetCase}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cases
          </button>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {selectedCase.questions.length}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedCase.title}</CardTitle>
            <CardDescription>{selectedCase.category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion === 0 && (
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-semibold mb-2">Clinical Presentation:</h3>
                <p className="text-sm">{selectedCase.presentation}</p>
              </div>
            )}

            {currentQuestion > 0 && selectedCase.questions[currentQuestion - 1].nextStep && (
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
                <p className="text-sm">
                  <strong>Update: </strong>
                  {selectedCase.questions[currentQuestion - 1].nextStep}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-100 dark:bg-red-900/20'
                          : 'border-primary bg-primary/10'
                        : showExplanation && index === question.correctAnswer
                        ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                        : 'border-border hover:border-primary/50'
                    } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className={`p-4 rounded-lg border-2 ${
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/20 border-green-500'
                  : 'bg-red-100 dark:bg-red-900/20 border-red-500'
              }`}>
                <p className="font-semibold mb-2">
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-sm">{question.explanation}</p>
              </div>
            )}

            <div className="flex space-x-4">
              {!showExplanation ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1"
                >
                  Submit Answer
                </Button>
              ) : !isLastQuestion ? (
                <Button onClick={handleNextQuestion} className="flex-1">
                  Next Question
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleResetCase} className="flex-1">
                  Complete Case - Return to Cases
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Clinical Cases</h1>
        <p className="text-lg text-muted-foreground">
          Interactive case scenarios with branching decision pathways
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((caseScenario) => (
          <Card
            key={caseScenario.id}
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => handleCaseSelect(caseScenario)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {caseScenario.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {caseScenario.questions.length} questions
                </span>
              </div>
              <CardTitle className="text-xl">{caseScenario.title}</CardTitle>
              <CardDescription className="text-base">
                {caseScenario.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
