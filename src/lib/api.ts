import { Property, CreatePropertyRequest, UpdatePropertyRequest } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getProperties(accessToken?: string): Promise<Property[]> {
  const response = await fetch(`${API_URL}/api/properties`, {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  
  return response.json();
}

export async function getProperty(propertyId: string, accessToken?: string): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch property');
  }
  
  return response.json();
}

export async function createProperty(data: CreatePropertyRequest, accessToken?: string): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create property');
  }
  
  return response.json();
}

export async function updateProperty(propertyId: string, data: UpdatePropertyRequest, accessToken?: string): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update property');
  }
  
  return response.json();
}

export async function deleteProperty(propertyId: string, accessToken?: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/properties/${propertyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete property');
  }
}
