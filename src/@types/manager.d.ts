type Manager = {
  id: string;
  name: string;
  email: string;
  company: {
    id: string;
    name: string;
  };
  created_at: string;
};

type ManagerInput = {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  company_id?: string;
};
