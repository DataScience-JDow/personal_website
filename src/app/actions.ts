'use server'

import { getSql } from '@/lib/db';
import { ensureMessagesTable } from '@/lib/messages';

export interface ActionState {
  success: boolean;
  message?: string;
  error?: string;
}

export function validateContactFormInput(input: {
  name?: string | null;
  email?: string | null;
  message?: string | null;
  website?: string | null;
}): ActionState | null {
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();
  const website = input.website?.trim();

  if (website) {
    return {
      success: true,
      message: 'Thanks. Your note was received.',
    };
  }

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  if (name.length > 80 || email.length > 120 || message.length > 1200) {
    return { success: false, error: 'Please keep the note concise and try again.' };
  }

  if (message.length < 20) {
    return { success: false, error: 'Please include a short note with a little context.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  return null;
}

export async function submitContactForm(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();
  const website = formData.get('website')?.toString().trim();

  const validationResult = validateContactFormInput({ name, email, message, website });

  if (validationResult) {
    return validationResult;
  }

  try {
    const sql = getSql();
    await ensureMessagesTable();

    await sql`
      INSERT INTO portfolio.messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;
    
    return { 
      success: true, 
      message: "Your note was sent. I'll follow up by email." 
    };
  } catch (error) {
    console.error('Error inserting message into portfolio.messages:', error);
    return { 
      success: false, 
      error: 'The form could not send right now. Email is the best fallback.' 
    };
  }
}
