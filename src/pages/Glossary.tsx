import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

interface GlossaryTerm {
  term: string
  category: string
  definition: string
  relatedTerms?: string[]
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'ABG (Arterial Blood Gas)',
    category: 'Diagnostics',
    definition: 'Laboratory test measuring arterial blood pH, PaCO₂, PaO₂, and bicarbonate. Essential for assessing respiratory and metabolic status.',
  },
  {
    term: 'AHI (Apnea-Hypopnea Index)',
    category: 'OSA',
    definition: 'Number of apnea and hypopnea events per hour of sleep. Used to classify OSA severity: Mild (5-15), Moderate (15-30), Severe (>30).',
  },
  {
    term: 'ARDS (Acute Respiratory Distress Syndrome)',
    category: 'Critical Care',
    definition: 'Acute inflammatory lung injury causing bilateral infiltrates and severe hypoxemia. Defined by Berlin criteria with PaO₂/FiO₂ ratio <300.',
  },
  {
    term: 'Barotrauma',
    category: 'Ventilation',
    definition: 'Lung injury from excessive airway pressure during mechanical ventilation. Prevented by limiting plateau pressure <30 cm H₂O.',
  },
  {
    term: 'Berlin Criteria',
    category: 'ARDS',
    definition: 'Diagnostic criteria for ARDS including timing, bilateral opacities, PaO₂/FiO₂ ratio, and ruling out cardiogenic edema.',
  },
  {
    term: 'Bronchodilator',
    category: 'Pharmacology',
    definition: 'Medication that relaxes bronchial smooth muscle. Includes beta-2 agonists (albuterol) and anticholinergics (ipratropium).',
  },
  {
    term: 'CAP (Community-Acquired Pneumonia)',
    category: 'Pneumonia',
    definition: 'Pneumonia acquired outside hospital settings or <48 hours after admission. Common pathogens include S. pneumoniae and atypicals.',
  },
  {
    term: 'CPAP (Continuous Positive Airway Pressure)',
    category: 'OSA',
    definition: 'First-line treatment for moderate-severe OSA. Provides continuous positive pressure to keep upper airway open during sleep.',
  },
  {
    term: 'CTPA (CT Pulmonary Angiography)',
    category: 'Imaging',
    definition: 'Gold standard imaging for pulmonary embolism. Contrast-enhanced CT visualizing pulmonary arteries.',
  },
  {
    term: 'CURB-65',
    category: 'Pneumonia',
    definition: 'Pneumonia severity score: Confusion, Urea, Respiratory rate, Blood pressure, age ≥65. Guides admission decisions.',
  },
  {
    term: 'D-dimer',
    category: 'Lab Tests',
    definition: 'Fibrin degradation product. High sensitivity but low specificity for PE. Used in low-moderate probability patients.',
  },
  {
    term: 'FEV₁',
    category: 'Pulmonary Function',
    definition: 'Forced Expiratory Volume in 1 second. Primary measure of airflow obstruction in COPD and asthma.',
  },
  {
    term: 'FiO₂',
    category: 'Ventilation',
    definition: 'Fraction of Inspired Oxygen. Expressed as decimal (0.21-1.0) or percentage (21-100%).',
  },
  {
    term: 'GOLD Classification',
    category: 'COPD',
    definition: 'Global Initiative for Chronic Obstructive Lung Disease. Classifies COPD severity by FEV₁: 1 (≥80%), 2 (50-80%), 3 (30-50%), 4 (<30%).',
  },
  {
    term: 'HAP (Hospital-Acquired Pneumonia)',
    category: 'Pneumonia',
    definition: 'Pneumonia developing ≥48 hours after hospital admission. Higher antibiotic resistance risk than CAP.',
  },
  {
    term: 'Hypercapnia',
    category: 'Physiology',
    definition: 'Elevated PaCO₂ >45 mmHg. Can cause respiratory acidosis. Common in COPD exacerbations.',
  },
  {
    term: 'IGRA (Interferon-Gamma Release Assay)',
    category: 'Tuberculosis',
    definition: 'Blood test for TB infection (QuantiFERON, T-SPOT). More specific than TST, unaffected by BCG vaccination.',
  },
  {
    term: 'Latent TB Infection (LTBI)',
    category: 'Tuberculosis',
    definition: 'Positive TB test without symptoms or active disease. Not contagious. Treated to prevent progression to active TB.',
  },
  {
    term: 'Lung-Protective Ventilation',
    category: 'ARDS',
    definition: 'Low tidal volume (6 mL/kg PBW), plateau pressure <30 cm H₂O, appropriate PEEP. Reduces VILI in ARDS.',
  },
  {
    term: 'NIPPV (Non-Invasive Positive Pressure Ventilation)',
    category: 'Ventilation',
    definition: 'Ventilatory support via face mask (BiPAP). Used in COPD hypercapnic respiratory failure, cardiogenic pulmonary edema.',
  },
  {
    term: 'PaCO₂',
    category: 'Lab Values',
    definition: 'Partial pressure of carbon dioxide in arterial blood. Normal: 35-45 mmHg. Elevated in hypoventilation.',
  },
  {
    term: 'PaO₂',
    category: 'Lab Values',
    definition: 'Partial pressure of oxygen in arterial blood. Normal: 80-100 mmHg. Low in hypoxemia.',
  },
  {
    term: 'PaO₂/FiO₂ Ratio',
    category: 'ARDS',
    definition: 'P/F ratio. Measure of oxygenation. Normal >400. ARDS: <300 (mild), <200 (moderate), <100 (severe).',
  },
  {
    term: 'Peak Flow',
    category: 'Asthma',
    definition: 'Maximum speed of expiration. Used to assess asthma severity. Expressed as % of personal best or predicted.',
  },
  {
    term: 'PEEP (Positive End-Expiratory Pressure)',
    category: 'Ventilation',
    definition: 'Pressure maintained in airways at end of expiration. Prevents atelectasis, improves oxygenation in ARDS.',
  },
  {
    term: 'PERC Rule',
    category: 'Pulmonary Embolism',
    definition: 'Pulmonary Embolism Rule-out Criteria. 8 criteria; if all absent in low-risk patients, PE can be ruled out.',
  },
  {
    term: 'Permissive Hypercapnia',
    category: 'Ventilation',
    definition: 'Tolerating elevated PaCO₂ to achieve lung-protective ventilation in ARDS. pH >7.2 generally acceptable.',
  },
  {
    term: 'Prone Positioning',
    category: 'ARDS',
    definition: 'Turning patient face-down. Improves V/Q matching and oxygenation in severe ARDS. Mortality benefit when PaO₂/FiO₂ <150.',
  },
  {
    term: 'RIPE Therapy',
    category: 'Tuberculosis',
    definition: 'First-line active TB treatment: Rifampin, Isoniazid, Pyrazinamide, Ethambutol. Intensive phase 2 months, then continuation phase.',
  },
  {
    term: 'SABA (Short-Acting Beta-2 Agonist)',
    category: 'Pharmacology',
    definition: 'Bronchodilator for acute asthma/COPD (albuterol, levalbuterol). Rapid onset, used for rescue therapy.',
  },
  {
    term: 'SpO₂',
    category: 'Vital Signs',
    definition: 'Oxygen saturation by pulse oximetry. Normal >95%. Target 88-92% in COPD with chronic hypercapnia.',
  },
  {
    term: 'STOP-BANG',
    category: 'OSA',
    definition: 'OSA screening: Snoring, Tired, Observed apnea, Pressure (HTN), BMI>35, Age>50, Neck circumference, Gender (male). Score ≥5 = high risk.',
  },
  {
    term: 'TST (Tuberculin Skin Test)',
    category: 'Tuberculosis',
    definition: 'PPD test. Intradermal TB antigen. Read at 48-72h. Interpretation depends on induration size and risk factors.',
  },
  {
    term: 'V/Q Mismatch',
    category: 'Physiology',
    definition: 'Imbalance between ventilation and perfusion. Causes hypoxemia. Seen in PE, pneumonia, ARDS.',
  },
  {
    term: 'V/Q Scan',
    category: 'Imaging',
    definition: 'Ventilation-perfusion scintigraphy. Alternative to CTPA for PE diagnosis. Preferred when contrast contraindicated.',
  },
  {
    term: 'VAP (Ventilator-Associated Pneumonia)',
    category: 'Pneumonia',
    definition: 'Pneumonia developing ≥48h after intubation. Highest antibiotic resistance risk. Pathogens: Pseudomonas, MRSA, Acinetobacter.',
  },
  {
    term: 'VILI (Ventilator-Induced Lung Injury)',
    category: 'Critical Care',
    definition: 'Lung damage from mechanical ventilation. Includes volutrauma, barotrauma, atelectrauma. Prevented by lung-protective strategies.',
  },
  {
    term: 'Volutrauma',
    category: 'Ventilation',
    definition: 'Lung injury from overdistension due to excessive tidal volumes. Prevented by low tidal volume ventilation (6 mL/kg).',
  },
  {
    term: 'Wells Score',
    category: 'Pulmonary Embolism',
    definition: 'Pre-test probability score for PE. <2 = low, 2-6 = moderate, >6 = high. Guides D-dimer vs imaging decisions.',
  },
]

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category))).sort()]

  const filteredTerms = glossaryTerms
    .filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Glossary</h1>
        <p className="text-lg text-muted-foreground">
          Reference guide for pulmonary terms, scoring systems, and concepts
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border bg-background"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredTerms.length} of {glossaryTerms.length} terms
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms List */}
      <div className="grid gap-4">
        {filteredTerms.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{item.term}</CardTitle>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {item.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.definition}</p>
              {item.relatedTerms && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs font-semibold mb-2">Related Terms:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.relatedTerms.map((related, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-muted">
                        {related}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No terms found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
