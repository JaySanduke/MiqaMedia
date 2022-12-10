import * as React from "react";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

export default function MultipleEmails({ inviteemails }) {
  const [emails, setEmails] = React.useState([]);

  async function handleChange(mails) {
    setEmails(mails);
    await inviteemails(mails);
  }

  return (
    <>
      <ReactMultiEmail
        emails={emails}
        onChange={(value) => handleChange(value)}
        getLabel={(email, index, removeEmail) => {
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
