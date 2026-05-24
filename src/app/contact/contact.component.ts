import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

declare var data: any;
declare var particlesJS: any;
declare var emailjs: any; // loaded via CDN in index.html

// ─── EmailJS Credentials ────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com/
// 2. Add Email Service (Gmail) → copy Service ID
// 3. Create Email Template with: {{from_name}} {{reply_to}} {{subject}} {{message}}
//    → copy Template ID
// 4. Account → API Keys → copy Public Key
const EMAILJS_SERVICE_ID  = 'service_lpoa358';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_u5yku6u';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'PZVkJAlStsEf0qRsD';   // e.g. 'AbCdEfGhIjKlMnOp'
// ────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent implements OnInit {

  public contactData = data['Contact'];

  public formData = { name: '', email: '', subject: '', message: '' };
  public status: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach();
  }

  ngOnInit(): void {
    particlesJS.load('particles-js2');
    this.changeDetectorRef.detectChanges();
  }

  async sendMessage(): Promise<void> {
    const { name, email, subject, message } = this.formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in Name, Email and Message.');
      return;
    }

    this.status = 'sending';
    this.changeDetectorRef.detectChanges();

    try {
      // Load EmailJS from CDN if not already injected
      if (typeof emailjs === 'undefined') {
        await this.loadEmailJsScript();
      }

      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        reply_to:  email,
        subject:   subject || 'Portfolio Contact',
        message:   message,
      });

      this.status = 'success';
      this.formData = { name: '', email: '', subject: '', message: '' };

    } catch (err) {
      console.error('EmailJS error:', err);
      this.status = 'error';
    }

    this.changeDetectorRef.detectChanges();
  }

  private loadEmailJsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('emailjs-sdk')) { resolve(); return; }
      const script = document.createElement('script');
      script.id  = 'emailjs-sdk';
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload  = () => resolve();
      script.onerror = () => reject(new Error('Failed to load EmailJS'));
      document.head.appendChild(script);
    });
  }
}
