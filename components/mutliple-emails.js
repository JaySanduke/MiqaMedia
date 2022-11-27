import * as React from "react";
import { useEffect, useState } from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";

export default function MutlipleEmails() {
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);

  return (
    <ReactMultiEmail
      options={emails}
      // placeholder="Input your email"
      emails={emails}
      onChange={(emails) => {
        setEmails(emails);
      }}
      autoFocus={true}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      getLabel={(email, index, removeEmail) => {
        return (
          <div className="multiple-email" data-tag key={index}>
            <div data-tag-item className="multiple-email-id">
              {email}
            </div>
            <span
              className="mutliple-email-delete"
              data-tag-handle
              onClick={() => removeEmail(index)}
            >
              ×
            </span>
            <style jsx>{`
              .multiple-email {
                display: flex;
                margin-bottom: 12px;
              }
              .multiple-email-id {
                margin-right: 8px;
              }
              .mutliple-email-delete {
                cursor: pointer;
              }
            `}</style>
          </div>
        );
      }}
    />
  );
}
