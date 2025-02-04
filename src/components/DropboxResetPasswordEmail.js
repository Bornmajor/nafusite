import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import React from 'react';

   
  const DropboxResetPasswordEmail = ({  resetPasswordLink }) => {
    return (
      <Html>
        <Head />
        <Preview>Nafusite reset your password</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dx8t5kvns/image/upload/v1738570219/samples/fq3jolk8flhyyprqgk1u.png"
              width="40"
              height="33"
              alt="Nafusite"
            />
            <Section>
              <Text style={text}>Hi valued customer,</Text>
              <Text style={text}>
                Someone recently requested a password change for your Nafusite account. If this was you, you can set a new password here:
              </Text>
              <Button style={button} href={resetPasswordLink}>
                Reset password
              </Button>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this message.
              </Text>
              {/* <Text style={text}>
                To keep your account secure, please don&apos;t forward this email to anyone. See our Help Center for{' '}
                <Link style={anchor} href="https://dropbox.com">
                  more security tips.
                </Link>
              </Text> */}
              <Text style={text}>Fine Fun Gems</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  // DropboxResetPasswordEmail.PreviewProps = {
  //   resetPasswordLink: 'https://nafusite.netlify.app/',
  // };
  
  export default DropboxResetPasswordEmail;
  
  const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
  };
  
  const text = {
    fontSize: '16px',
    fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
  };
  
  const button = {
    backgroundColor: '#007ee6',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    width: '210px',
    padding: '14px 7px',
  };
  
  const anchor = {
    textDecoration: 'underline',
  };
  
