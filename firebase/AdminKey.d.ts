// adminKey.d.ts

interface AdminKey {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string; // Use string to accommodate the private key format
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
  }
  type AdminKey = {admin}
  
  // Export the interface if needed
  export type { AdminKey };