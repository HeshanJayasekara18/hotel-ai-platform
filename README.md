# 🏨 AI-Powered Hotel Management & Booking System

A modern, full-stack hospitality platform that replaces traditional forms with a conversational AI assistant. This system handles the entire guest journey—from initial inquiry and room selection to automated admin notifications via WhatsApp and Email.

---

## 🚀 Key Features

- **🤖 AI Guest Assistant**: A built-in AI concierge that helps users check availability, explains hotel amenities, and handles the booking process through natural conversation.
- **📅 Real-time Reservations**: Powered by Supabase and Prisma, ensuring room availability is updated instantly across the guest and admin portals.
- **🔔 Automated Admin Alerts**: Uses background workers to send instant WhatsApp messages and Emails to the hotel owner as soon as a booking is confirmed.
- **📊 Comprehensive Admin Dashboard**: A private area for staff to manage room listings, track revenue, and view guest history.
- **✨ High-Performance UI**: A sleek, premium "Hero Section" featuring AI-generated environmental visuals and Lenis smooth scrolling, optimized for high conversion rates.

---

## 🛠️ The Tech Stack

| Layer              | Technology                                                                                                                      |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**       | [Next.js 15+](https://nextjs.org/), [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Smooth Scroll**  | [Lenis](https://lenis.darkroom.engineering/)                                                                                    |
| **Backend**        | [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)                              |
| **Database**       | [Supabase](https://supabase.com/) (PostgreSQL)                                                                                  |
| **ORM**            | [Prisma](https://www.prisma.io/)                                                                                                |
| **AI Integration** | [OpenAI API](https://openai.com/index/openai-api/)                                                                              |
| **Notifications**  | [Twilio](https://www.twilio.com/) (WhatsApp) & [Resend](https://resend.com/) (Email)                                            |

---

## 🏗️ Architecture & Logic

1.  **Guest Interaction**: The user chats with the AI assistant. The AI uses a "function calling" approach to check the database via Prisma.
2.  **Booking Logic**: Once the user confirms, a record is created in Supabase.
3.  **Automation Trigger**: A database webhook triggers a service that sends a WhatsApp notification to the Admin and a confirmation email to the Guest.
4.  **Admin Control**: The admin logs into the dashboard to see the new booking and update room status in real-time.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Master-GB/Your-Repo-Name.git
cd Your-Repo-Name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
DATABASE_URL="your_supabase_postgresql_url"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
OPENAI_API_KEY="your_openai_key"
WHATSAPP_API_TOKEN="your_token"
```

### 4. Initialize Prisma

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the project

```bash
npm run dev
```

---

## 💡 Why This Project?

This system was built to solve the friction in traditional booking systems. By using AI for communication and automation for administration, it reduces the workload for small hotel owners while providing a premium "concierge" experience for every guest.
