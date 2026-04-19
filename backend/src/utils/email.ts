import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const send_email = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: "HireIQ <hireiq@resend.dev>",
      to: ["santu700141@gmail.com"],
      subject: "Hello World",
      html: 'Hello it works',
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  } catch (error) {
    console.log(error);
  }
};
