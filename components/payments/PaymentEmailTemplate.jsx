import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function PaymentEmailTemplate({ name, email }) {
  return (
    <Html>
      <Head />
      <Preview>Payment Confirmed — Welcome to the event, {name}!</Preview>
      <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "600px", margin: "40px auto" }}>

          {/* Top Accent Bar */}
          <Section style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)", height: "6px", borderRadius: "6px 6px 0 0" }} />

          {/* Header */}
          <Section style={{ backgroundColor: "#ffffff", padding: "40px 48px 32px", borderLeft: "1px solid #e8e8e8", borderRight: "1px solid #e8e8e8" }}>
            <Text style={{ color: "#6366f1", fontSize: "13px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 12px" }}>
              Eventry Platform
            </Text>
            <Heading style={{ color: "#1a1a2e", fontSize: "28px", fontWeight: "800", margin: "0 0 8px", lineHeight: "1.2" }}>
              Payment Confirmed
            </Heading>
            <Text style={{ color: "#6b7280", fontSize: "15px", margin: "0" }}>
              Your registration is complete and your spot is reserved.
            </Text>
          </Section>

          {/* Divider */}
          <Section style={{ backgroundColor: "#ffffff", padding: "0 48px", borderLeft: "1px solid #e8e8e8", borderRight: "1px solid #e8e8e8" }}>
            <Hr style={{ borderColor: "#f0f0f0", margin: "0" }} />
          </Section>

          {/* Greeting */}
          <Section style={{ backgroundColor: "#ffffff", padding: "28px 48px", borderLeft: "1px solid #e8e8e8", borderRight: "1px solid #e8e8e8" }}>
            <Text style={{ color: "#374151", fontSize: "16px", lineHeight: "1.7", margin: "0" }}>
              Hello <strong style={{ color: "#1a1a2e" }}>{name}</strong>,
              <br /><br />
              Thank you for your payment. Your booking has been successfully confirmed.
              We are delighted to have you join us at the event.
            </Text>
          </Section>

          {/* Booking Details */}
          <Section style={{ backgroundColor: "#ffffff", padding: "0 48px 32px", borderLeft: "1px solid #e8e8e8", borderRight: "1px solid #e8e8e8" }}>

            <Text style={{ color: "#1a1a2e", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 16px" }}>
              Booking Summary
            </Text>

            {/* Name */}
            <table width="100%" style={{ marginBottom: "0" }}>
              <tr>
                <td style={{ backgroundColor: "#f8f7ff", padding: "14px 18px", borderRadius: "10px 10px 0 0", borderBottom: "1px solid #ede9fe" }}>
                  <table width="100%">
                    <tr>
                      <td style={{ color: "#8b5cf6", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Full Name</td>
                      <td style={{ color: "#1a1a2e", fontSize: "14px", fontWeight: "700", textAlign: "right" }}>{name}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Email */}
              <tr>
                <td style={{ backgroundColor: "#fff7f9", padding: "14px 18px", borderBottom: "1px solid #fce7f3" }}>
                  <table width="100%">
                    <tr>
                      <td style={{ color: "#ec4899", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Email</td>
                      <td style={{ color: "#1a1a2e", fontSize: "14px", fontWeight: "700", textAlign: "right" }}>{email}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Status */}
              <tr>
                <td style={{ backgroundColor: "#f0fdf4", padding: "14px 18px", borderRadius: "0 0 10px 10px" }}>
                  <table width="100%">
                    <tr>
                      <td style={{ color: "#16a34a", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Status</td>
                      <td style={{ textAlign: "right" }}>
                        <span style={{ backgroundColor: "#16a34a", color: "#ffffff", fontSize: "11px", fontWeight: "700", padding: "4px 16px", borderRadius: "20px", letterSpacing: "1px" }}>
                          CONFIRMED
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </Section>

          {/* Note */}
          <Section style={{ backgroundColor: "#ffffff", padding: "0 48px 40px", borderLeft: "1px solid #e8e8e8", borderRight: "1px solid #e8e8e8" }}>
            <Section style={{ backgroundColor: "#eff6ff", borderLeft: "4px solid #6366f1", borderRadius: "0 8px 8px 0", padding: "16px 20px" }}>
              <Text style={{ color: "#3730a3", fontSize: "14px", margin: "0", lineHeight: "1.6" }}>
                Please present this confirmation upon arrival at the event.
                For any queries, contact our support team at{" "}
                <span style={{ color: "#6366f1", fontWeight: "600" }}>support@litondev.com</span>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#1a1a2e", padding: "32px 48px", borderRadius: "0 0 6px 6px" }}>
            <table width="100%">
              <tr>
                <td>
                  <Text style={{ color: "#ffffff", fontSize: "16px", fontWeight: "800", margin: "0", letterSpacing: "3px" }}>
                    EVENTRY
                  </Text>
                  <Text style={{ color: "#6b7280", fontSize: "12px", margin: "6px 0 0" }}>
                    © 2026 · All rights reserved
                  </Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text style={{ color: "#6b7280", fontSize: "12px", margin: "0" }}>
                    This is an automated email.
                    <br />Please do not reply.
                  </Text>
                </td>
              </tr>
            </table>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}