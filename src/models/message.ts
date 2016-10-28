

export interface Message {
  message: string;
  class?: string;
  viewed: boolean;
}



export function welcomeMessage(): Message {
  return {
    message: `T'hem agegit aquests jocs. Pots modificar-los, eliminar-los o crear-ne de nous!`,
    viewed: false
  };
};
