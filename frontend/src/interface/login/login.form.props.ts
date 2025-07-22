export default interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}
