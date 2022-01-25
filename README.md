This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Functions
1. Login/Register, using Cognito for authentication
2. Income Record, using DynamoDB, S3
Record income from different recourse, including wages, interests, money transfer from other people
3. Expense Record, using DynamoDB, S3
Record different expense and recording related information such as biller, category, amount, du date
4. Billing Record (file uploading), using DynamoDB, S3
Record bills such as utilities, monthly phone bill, tuition fee….
5. Billing Reminder, using external emailing API, text message API
Sending reminder before the due date of outstanding bills
6. Pay Bill
Once the bill is paid, user is able to click the pay bill button and all expense information should be automatically recorded
7. Reporting, using google sheet API
Generate reports on cash position, income/expense, etc which can be export to google sheet
8. User Data Analysis
Analysis data based on current user’s data and all user data	EMR for user data mining and analysis
9. Data/Files archive, using S3 Glacier
Archive dated files and data

The software will be deployed using Beanstalk on AWS. All the services will be on cloud. Other AWS services will be used include lambda and API Gateway for pdf generating, ECS for deployment, CloudFront for static page/ picture cache and increase the page loading speed.

## Data Schema
### Contact
name: string, not null

address: string

email: string

contactNumber: string

bankAccount: string

### Account
name: string, not null

### Bill
contact: contact_id, string/int, not null

date: date, not null

duedate: date, not null

ref: string

description: string

amount: decimal, not null

account: account_id, string/int, not null

attachment: string, base64

ispaid: bool, default false

### Expense
contact: contact_id, string/int, not null

date: date, not null

ref: string

description: string

amount: decimal, not null

account: account_id, string/int, not null

bill: bill_id, string/int

### Income
contact: contact_id, string/int, not null

date: date, not null

ref: string

description: string

amount: decimal, not null
