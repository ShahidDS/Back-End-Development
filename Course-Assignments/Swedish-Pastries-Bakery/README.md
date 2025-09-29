# Swedish Pastries Bakery Management System

## Description

This project manages inventory for a bakery specializing in Swedish pastries. It provides a RESTful API to create, read, update, and delete pastry information with full TypeScript support and Zod validation.

## Features

- Full CRUD operations for pastries
- Type validation with Zod schemas
- Filter pastries by type (cake, cookie, bread, pastry)
- In-memory data storage (easily replaceable with a database)
- Comprehensive error handling

## Zod Schema Explanation

### PastrySchema

Validates the structure of pastry objects with the following rules:

- **id**: Must be a valid UUID string
- **name**:
  - 2-50 characters long
  - Only letters and spaces (supports Swedish characters åäöÅÄÖ)
- **type**: Must be one of: 'cake', 'cookie', 'bread', 'pastry'
- **price**:
  - Positive number
  - Maximum 1000 SEK
- **ingredients**:
  - Array of strings
  - 1-20 ingredients required
- **inStock**: Boolean value, defaults to true
- **description**: Optional string, maximum 200 characters

### Example Validation:

```typescript
const validPastry = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Kanelbulle",
  type: "pastry",
  price: 25,
  ingredients: ["flour", "cinnamon", "butter"],
  inStock: true,
  description: "Traditional Swedish cinnamon bun",
};
```
