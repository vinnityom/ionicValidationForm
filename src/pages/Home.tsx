import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLabel,
  IonText,
  IonList,
  IonItem,
  IonAlert,
} from '@ionic/react';
import React from 'react';
import { InputChangeEventDetail } from '@ionic/core';
import validator from 'validator';

interface ComponentState {
  email: string;
  isEmailValid: boolean;
  password: string;
  areFieldsFilled: boolean;
  isEnteredDataRight: any;
  isAlertOpen: boolean;
};

interface rightUser {
  'example@example.com': string;
  [key: string]: string;
}

const rightUser: rightUser = {
  'example@example.com': '123',
};

class Home extends React.Component<{}, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      isEmailValid: false,
      password: '',
      areFieldsFilled: false,
      isEnteredDataRight: null,
      isAlertOpen: false,
    };
  }

  toggleAlert = () => {
    const { isAlertOpen } = this.state;
    this.setState({ isAlertOpen: !isAlertOpen });
  }

  checkIfFilled = () => {
    const { email, password, isEmailValid } = this.state;
    const areFilled = email.length > 0 && isEmailValid && password.length > 0;
    this.setState({ areFieldsFilled: areFilled });
  }
  
  handleEmailInput = (e: CustomEvent<InputChangeEventDetail>) => {
    const { value }: any = e.detail;
    this.setState({ email: value, isEmailValid: validator.isEmail(value) });
    this.checkIfFilled();
  }

  handlePasswordInput =(e: CustomEvent<InputChangeEventDetail>) => {
    const { value }: any = e.detail;
    this.setState({ password: value });
    this.checkIfFilled();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    const isEnteredDataRight: boolean = rightUser[email] === password;
    this.setState({ isEnteredDataRight })
    this.toggleAlert();
  }

  render() {
    const {
      email,
      isEmailValid,
      password,
      areFieldsFilled,
      isAlertOpen,
      isEnteredDataRight,
    } = this.state;
    const emailInputColor = isEmailValid ? 'success' : 'danger';

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Validation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={this.handleSubmit}>
            <IonList lines="full" class="ion-no-margin ion-no-padding">
              <IonItem>
                <IonLabel>Email <IonText color="danger">*</IonText></IonLabel>
                <IonInput
                  type="email"
                  onIonChange={this.handleEmailInput}
                  color={email.length > 0 ? emailInputColor : 'dark'}
                  value={email}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel>Password <IonText color="danger">*</IonText></IonLabel>
                <IonInput
                  type="password"
                  onIonChange={this.handlePasswordInput}
                  value={password}
                  required={true}
                />
              </IonItem>
            </IonList>
            <IonButton disabled={!areFieldsFilled} type="submit">Log in</IonButton>
          </form>
          <IonAlert
            isOpen={isAlertOpen}
            onDidDismiss={this.toggleAlert}
            message={isEnteredDataRight ? 'Success' : 'Sorry, but your email or password is incorrect'}
            buttons={['OK']}
          />
        </IonContent>
      </>
    );
  }
};

export default Home;