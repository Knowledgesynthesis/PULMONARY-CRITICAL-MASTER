import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'

export function Settings() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the visual theme of the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div className="space-y-1">
              <p className="font-semibold">Theme Mode</p>
              <p className="text-sm text-muted-foreground">
                Currently using {theme === 'light' ? 'Light' : 'Dark'} mode
              </p>
            </div>
            <Button
              onClick={toggleTheme}
              variant="outline"
              className="flex items-center gap-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-4 w-4" />
                  Switch to Dark
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Switch to Light
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About the App */}
      <Card>
        <CardHeader>
          <CardTitle>About Pulmonary Critical Master</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Mission</h3>
            <p className="text-sm text-muted-foreground">
              Pulmonary Critical Master is an interactive educational platform designed to teach rapid stabilization,
              red-flag recognition, imaging pathways, and evidence-based treatment for pulmonary emergencies and
              chronic respiratory conditions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Coverage</h3>
            <p className="text-sm text-muted-foreground mb-2">
              This app covers 7 major pulmonary conditions:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
              <li>Asthma Exacerbation</li>
              <li>COPD Exacerbation</li>
              <li>Pneumonia (CAP, HAP, VAP)</li>
              <li>Tuberculosis</li>
              <li>Pulmonary Embolism</li>
              <li>ARDS (Acute Respiratory Distress Syndrome)</li>
              <li>Obstructive Sleep Apnea</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
              <li>Interactive severity calculators and clinical tools</li>
              <li>Branching case scenarios for clinical reasoning</li>
              <li>Comprehensive assessment questions with immediate feedback</li>
              <li>Evidence-based educational content</li>
              <li>Mobile-first responsive design</li>
              <li>Dark mode optimized for comfortable learning</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Version</h3>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card>
        <CardHeader>
          <CardTitle>Important Disclaimers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              ⚠️ Educational Purpose Only
            </h3>
            <p className="text-sm">
              This application is designed for educational purposes only. It is NOT intended to replace
              professional medical advice, diagnosis, or treatment. Always seek the advice of qualified
              health providers with any questions regarding medical conditions.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-500">
            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
              ⚠️ Not for Clinical Use
            </h3>
            <p className="text-sm">
              Do NOT use this application for actual patient care decisions. All clinical scenarios,
              drug dosing information, and treatment algorithms are synthetic and conceptual frameworks
              for learning purposes only.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">General Disclaimers</h3>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc list-inside">
              <li>
                <strong>No Medical Advice:</strong> The content provided in this app does not constitute
                medical advice and should not be relied upon for health decisions.
              </li>
              <li>
                <strong>Synthetic Data:</strong> All cases, scenarios, and dosing information are entirely
                synthetic and created for educational demonstration purposes.
              </li>
              <li>
                <strong>No Warranty:</strong> The information is provided "as is" without warranty of any kind.
                We make no representations about the accuracy or completeness of the content.
              </li>
              <li>
                <strong>Professional Responsibility:</strong> Healthcare professionals should rely on their
                clinical judgment, institutional protocols, and current evidence-based guidelines for patient care.
              </li>
              <li>
                <strong>No Data Collection:</strong> This application does not track, store, or transmit any
                user data or assessment scores. All interactions remain local to your device.
              </li>
              <li>
                <strong>Updates:</strong> Medical knowledge evolves rapidly. Always refer to current clinical
                practice guidelines and peer-reviewed literature for the most up-to-date information.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-500">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Framework Alignment
            </h3>
            <p className="text-sm">
              The educational concepts in this app are conceptually aligned with major respiratory medicine
              frameworks including ATS/ERS, GOLD, IDSA, SCCM/ARDSNet, and WHO TB guidelines. However, users
              should always refer to the original source guidelines for clinical practice.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle>Target Audience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            This educational platform is designed for:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
            <li>Medical students learning pulmonary medicine</li>
            <li>Emergency medicine residents and fellows</li>
            <li>Internal medicine residents and pulmonary fellows</li>
            <li>Physician assistants and nurse practitioners in acute care settings</li>
            <li>Critical care trainees</li>
            <li>Healthcare professionals seeking pulmonary emergency review</li>
          </ul>
        </CardContent>
      </Card>

      {/* Contact/Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is an educational tool developed to enhance pulmonary medicine learning.
            If you have suggestions for improvement or encounter any issues, please consider
            contributing feedback to help make this resource better for all learners.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
