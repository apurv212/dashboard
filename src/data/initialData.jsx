export const initialData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          title: "Cloud Accounts",
          type: "donut",
          data: {
            total: 2,
            segments: [
              { label: "Connected", value: 2, color: "blue" },
              { label: "Not Connected", value: 0, color: "lightblue" }
            ]
          }
        },
        {
          id: "risk-assessment",
          title: "Cloud Account Risk Assessment",
          type: "donut",
          data: {
            total: 9659,
            segments: [
              { label: "Failed", value: 1835, color: "red" },
              { label: "Warning", value: 661, color: "yellow" },
              { label: "Not available", value: 30, color: "gray" },
              { label: "Passed", value: 7133, color: "green" }
            ]
          }
        },
      ]
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "container-insights",
          title: "Container Insights",
          type: "donut",
          data: {
            total: 500,
            segments: [
              { label: "Healthy", value: 450, color: "green" },
              { label: "Warning", value: 30, color: "yellow" },
              { label: "Critical", value: 20, color: "red" }
            ]
          }
        }
      ]
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          title: "Image Risk Assessment",
          type: "progress",
          data: {
            total: 1470,
            label: "Total vulnerabilities",
            segments: [
              { label: "Critical", value: 9, color: "red" },
              { label: "High", value: 786, color: "orange" }
            ]
          }
        },
        {
          id: "security-issues",
          title: "Image Security Issues",
          type: "progress",
          data: {
            total: 2,
            label: "Total images",
            segments: [
              { label: "Critical", value: 2, color: "red" },
              { label: "High", value: 2, color: "orange" }
            ]
          }
        },

      ]
    },
    {
      id: "iam",
      name: "IAM Dashboard",
      widgets: [
        {
          id: "permission-analysis",
          title: "Permission Analysis",
          type: "progress",
          data: {
            total: 200,
            label: "Total Permissions",
            segments: [
              { label: "Excessive", value: 30, color: "red" },
              { label: "Optimal", value: 170, color: "green" }
            ]
          }
        }
      ]
    }
  ],
  availableWidgets: [
    { id: "cloud-accounts", title: "Cloud Accounts", category: "cspm" },
    { id: "risk-assessment", title: "Cloud Account Risk Assessment", category: "cspm" },
    { id: "security-posture", title: "Security Posture Overview", category: "cspm" },
    { id: "security-enhancement", title: "Security enhancement", category: "cspm" },
    { id: "security-protocol", title: "Security protocol", category: "cspm" },
    { id: "namespace-alerts", title: "Top 5 Namespace Specific Alerts", category: "cwpp" },
    { id: "workload-alerts", title: "Workload Alerts", category: "cwpp" },
    { id: "container-insights", title: "Container Insights", category: "cwpp" },
    { id: "image-risk", title: "Image Risk Assessment", category: "registry" },
    { id: "security-issues", title: "Image Security Issues", category: "registry" },
    { id: "compliance-status", title: "Compliance Status", category: "registry" },
    { id: "user-risk", title: "User Risk Assessment", category: "iam" },
    { id: "permission-analysis", title: "Permission Analysis", category: "iam" }
  ]
};
