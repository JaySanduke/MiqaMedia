import * as React from "react";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

const styles = {
  fontFamily: "sans-serif",
  width: "500px",
  border: "1px solid #eee",
  background: "#f3f3f3",
  padding: "25px",
  margin: "20px"
};


export default function MultipleEmails({inviteemails}) {
  const [emails, setEmails] = React.useState([]);

  async function handleChange(mails) {
    await setEmails(mails);
    await inviteemails(mails);
  }

  return (
    <>
      <ReactMultiEmail
        placeholder="Input your Email Address"
        emails={emails}
        onChange={(value) => handleChange(value)}
        getLabel={(
          email,
          index,
          removeEmail
        ) => {
          return (
            <div data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </>
  );
}