import { Box, Heading } from '@chakra-ui/react'
import Image from 'next/image'

const ProfileCard = ({ name }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    marginTop="12"
    marginX="5"
  >
    <Image
      src={`/images/about/${name}.png`}
      alt={name}
      width="200"
      height="200"
    />
    <Heading size={'lg'} color="#748A9D" textAlign="center" marginTop="12">
      {name}
    </Heading>
  </Box>
)

export default ProfileCard
