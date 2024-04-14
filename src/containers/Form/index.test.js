import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When the Form component is rendered", () => {
  it("displays a list of form fields", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("calls the success action", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      const button = await screen.findByTestId("button-test-id");
      fireEvent.click(button);

      // Wait for the button text to change to "En cours"
      await waitFor(() => expect(screen.getByText("En cours")).toBeInTheDocument());

      // Now the button text should automatically return to "Envoyer"
      await waitFor(() => expect(screen.getByText("Envoyer")).toBeInTheDocument(), {timeout: 4000});

      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
