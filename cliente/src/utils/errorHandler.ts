export const errorHandler = ({ history, error: { graphQLErrors, networkError } }:{history:any, error:{graphQLErrors:any, networkError:any}}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions, message }:{extensions:{code:string}, message:string}) => {
      switch (extensions.code) {
        case 'INTERNAL_SERVER_ERROR':
          window.alert('Server Error');
          break;
        case 'UNAUTHENTICATED':
          window.alert('inténtelo de nuevo después de iniciar sesión');
          localStorage.removeItem('token');
          history.push('/login');
          break;
        default:
          window.alert(message);
      }
    },
    );
  }
  if (networkError) {
    window.alert('Network Error');
  }
};
