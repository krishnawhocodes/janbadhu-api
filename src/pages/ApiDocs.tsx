import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DocsSidebar } from "@/components/DocsSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ApiDocs() {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "authentication", "get-complaint", "patch-complaint", "error-codes"];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  const getComplaintExample = `{
  "subject": "Pothole near park",
  "authority": "Municipal Roads Department",
  "coordinates": { "lat": 22.5726, "lng": 88.3639 },
  "time": "2025-09-13T06:10:00.000Z",
  "upvotes": 9
}`;

  const patchRequestExample = `{
  "subject": "uncleanliness of park",
  "upvotes": 25
}`;

  const patchResponseExample = `{
  "message": "Complaint updated",
  "data": {
    "subject": "uncleanliness of park",
    "authority": "Municipal Roads Department",
    "coordinates": { "lat": 22.5726, "lng": 88.3639 },
    "time": "2025-09-13T06:10:00.000Z",
    "upvotes": 25
  }
}`;

  return (
    <div className="docs-container">
      {/* Header */}
      <header className="docs-header">
        <h1 className="text-xl font-bold text-primary">JanBandhu API Docs</h1>
        <ThemeToggle />
      </header>

      {/* Sidebar */}
      <DocsSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />

      {/* Main content */}
      <main className="docs-content">
        {/* Introduction */}
        <section id="introduction">
          <h1 className="docs-h1">JanBandhu API Documentation</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Welcome to the JanBandhu API documentation. This RESTful API provides endpoints for 
            complaint reporting and management in the JanBandhu project, enabling citizens to 
            report civic issues and track their resolution status.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The API supports operations for retrieving complaint details and updating complaint 
            information, with comprehensive error handling and authentication mechanisms.
          </p>
        </section>

        {/* Authentication */}
        <section id="authentication">
          <h2 className="docs-h2">Authentication</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            All API requests require authentication using an API key. Include your API key in the 
            request headers as shown below:
          </p>
          
          <CodeBlock 
            code="x-api-key: your-api-key-here" 
            language="http"
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Requests without a valid API key will return a 
              <code className="bg-yellow-100 px-1 rounded">401 Unauthorized</code> error.
            </p>
          </div>
        </section>

        {/* GET Endpoint */}
        <section id="get-complaint">
          <h2 className="docs-h2">GET /api/complaints/:id</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Retrieve detailed information about a specific complaint using its unique identifier.
          </p>

          <h3 className="docs-h3">Request</h3>
          <CodeBlock 
            code="GET http://localhost:3000/api/complaints/complaint123" 
            language="http"
          />

          <h3 className="docs-h3">Response</h3>
          <p className="text-muted-foreground mb-2">
            Returns a JSON object containing the complaint details:
          </p>
          <CodeBlock code={getComplaintExample} />

          <div className="mt-4">
            <h4 className="font-medium text-foreground mb-2">Response Fields</h4>
            <div className="space-y-2 text-sm">
              <div><code className="bg-muted px-1 rounded">subject</code> - Brief description of the complaint</div>
              <div><code className="bg-muted px-1 rounded">authority</code> - Responsible government department</div>
              <div><code className="bg-muted px-1 rounded">coordinates</code> - Geographic location (latitude and longitude)</div>
              <div><code className="bg-muted px-1 rounded">time</code> - Timestamp when the complaint was reported</div>
              <div><code className="bg-muted px-1 rounded">upvotes</code> - Number of citizen endorsements</div>
            </div>
          </div>
        </section>

        {/* PATCH Endpoint */}
        <section id="patch-complaint">
          <h2 className="docs-h2">PATCH /api/complaints/:id</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Partially update complaint details by providing only the fields you want to modify.
          </p>

          <h3 className="docs-h3">Request</h3>
          <CodeBlock 
            code="PATCH http://localhost:3000/api/complaints/complaint123" 
            language="http"
          />

          <h3 className="docs-h3">Request Body</h3>
          <p className="text-muted-foreground mb-2">
            Send a JSON object with the fields to update:
          </p>
          <CodeBlock code={patchRequestExample} />

          <h3 className="docs-h3">Response</h3>
          <p className="text-muted-foreground mb-2">
            Returns a confirmation message with the updated complaint data:
          </p>
          <CodeBlock code={patchResponseExample} />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Only include the fields you want to update in the request body. 
              Omitted fields will remain unchanged.
            </p>
          </div>
        </section>

        {/* Error Codes */}
        <section id="error-codes">
          <h2 className="docs-h2">Error Codes</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The API uses standard HTTP status codes to indicate the success or failure of requests.
          </p>

          <div className="space-y-6">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-medium text-red-600 mb-2">401 Unauthorized</h3>
              <p className="text-muted-foreground text-sm mb-2">
                The request lacks valid authentication credentials.
              </p>
              <div className="text-sm">
                <strong>Common causes:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>Missing <code className="bg-muted px-1 rounded">x-api-key</code> header</li>
                  <li>Invalid or expired API key</li>
                </ul>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="font-medium text-orange-600 mb-2">404 Not Found</h3>
              <p className="text-muted-foreground text-sm mb-2">
                The requested complaint ID does not exist in the database.
              </p>
              <div className="text-sm">
                <strong>Solution:</strong>
                <span className="text-muted-foreground ml-1">Verify the complaint ID and try again.</span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="font-medium text-red-700 mb-2">500 Internal Server Error</h3>
              <p className="text-muted-foreground text-sm mb-2">
                An unexpected error occurred on the server.
              </p>
              <div className="text-sm">
                <strong>Common causes:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>Malformed request body format</li>
                  <li>Database connectivity issues</li>
                  <li>Server configuration problems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Add some bottom padding to ensure footer doesn't cover content */}
        <div className="h-20"></div>
      </main>

      {/* Footer */}
      <footer className="docs-footer">
        © 2025 JanBandhu Project - API Documentation
      </footer>
    </div>
  );
}