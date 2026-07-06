'use server'

import { validateContactFormInput, type ActionState } from '@/lib/contact-form';
import { getSql } from '@/lib/db';
import { ensureMessagesTable } from '@/lib/messages';

export async function submitContactForm(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();
  const website = formData.get('website')?.toString().trim();

  const validationResult = validateContactFormInput({ name, email, message, website });

  if (validationResult) {
    return validationResult;
  }

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
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
