'use server'

import { sql } from '@/lib/db';

export interface ActionState {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    // Insert form submission into the Supabase database portfolio schema
    await sql`
      INSERT INTO portfolio.messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;
    
    return { 
      success: true, 
      message: "Your message has been sent successfully! I'll get back to you shortly." 
    };
  } catch (error) {
    console.error('Error inserting message into portfolio.messages:', error);
    return { 
      success: false, 
      error: 'An error occurred while sending your message. Please try again.' 
    };
  }
}
