import { Container, Button, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { TwitterButton, TwitterTweet } from 'react-social-plugins';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const linkedinLink = 'https://www.linkedin.com/company/alkemy2020/?originalSubdomain=ar';
const twitterTweet =
  'https://twitter.com/somosmas?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1245758106392580097%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=http%3A%2F%2Flocalhost%3A3000%2Fnosotros';

const SocialWidgets = () => {
  return (
    <Container>
      <HStack>
        <Button as="a" colorScheme="facebook" href={`${linkedinLink}`} leftIcon={<FaLinkedin />}>
          Linkedin
        </Button>
        <Button as="a" colorScheme="twitter" href={`${twitterTweet}`} leftIcon={<FaTwitter />}>
          Twitter
        </Button>
      </HStack>
      <div>
        <TwitterTweet
          align="left"
          coversation="none"
          theme="light"
          tweetId="1245758106392580097"
          width={325}
        />
      </div>
    </Container>
  );
};

export default SocialWidgets;
