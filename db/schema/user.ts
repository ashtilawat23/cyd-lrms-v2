const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["auth0_id", "name", "email", "role", "organizations", "chapters"],
    properties: {
      auth0_id: {
        bsonType: "string",
        description: "Auth0 ID"
      },
      name: {
        bsonType: "string",
        description: "User's full name"
      },
      email: {
        bsonType: "string",
        description: "User's email address"
      },
      role: {
        bsonType: "string",
        enum: ["superadmin", "orgAdmin", "chapterAdmin", "chapterMember"],
        description: "User's role"
      },
      organizations: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["organization_id", "role"],
          properties: {
            organization_id: {
              bsonType: "objectId",
              description: "Organization ID"
            },
            role: {
              bsonType: "string",
              description: "Role within the organization"
            }
          }
        }
      },
      chapters: {
        bsonType: "array",
        items: {
          bsonType: "objectId"
        },
        description: "List of chapter IDs the user is associated with"
      },
      hasAccess: {
        bsonType: "bool",
        description: "Whether the user has access"
      },
      stripe_subscription_id: {
        bsonType: "string",
        description: "Stripe subscription ID"
      },
      payment_info: {
        bsonType: "object",
        properties: {
          stripe_id: {
            bsonType: "string",
            description: "Stripe payment ID"
          }
        },
        description: "User's payment information"
      }
    }
  }
};

export default userSchema;
