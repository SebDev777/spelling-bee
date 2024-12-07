import swal from "@sweetalert/with-react";

const password = "OK";

function passwordPrompt(setVerified) {
  return swal({
    dangerMode: true,
    title: "Verification",
    content: {
      element: "input",
      attributes: {
        placeholder: "Type the password here.",
      },
    },
  }).then((v) => {
    console.log(v);
    if (!v || v === "") {
      swal({
        dangerMode: true,
        title: "Type a password",
        buttons: {
          ok: {
            text: "Okay"
          }
        },
      }).then(passwordPrompt);
      return;
    }
    if (v !== password) {
      swal({
        dangerMode: true,
        title: "Incorrect password",
        buttons: {
          ok: {
            text: "Retry"
          }
        }
      }).then(passwordPrompt);
    } else {
      swal({
        icon: "success",
        title: "Entered!",
        buttons: {
          exit: {
            text: "Continue",
          },
        },
        content: (
          <div>
            <h4>Now you can view & use the page.</h4>
          </div>
        ),
      }).then(() => {
        setVerified(true)
      })
    }
  });
}

export default function VerificationPrompt(setVerified) {
  swal({
    icon: "info",
    title: "Disclaimer",
    content: (
      <div>
        <h4>
          This page was made to medium or big screen sizes, small sizes may have
          display problems.
        </h4>
      </div>
    ),
  }).then(() => {
    passwordPrompt(setVerified)
  });
}
