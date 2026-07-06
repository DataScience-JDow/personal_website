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
