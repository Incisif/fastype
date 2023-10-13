type LoginModalProps = {
    onClose: () => void;
  };
  
  const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {

    return (
      <div>
        {/* Votre contenu de modal ici */}
        <button onClick={onClose}>Fermer</button>
      </div>
    );
  };
  
  export default LoginModal;