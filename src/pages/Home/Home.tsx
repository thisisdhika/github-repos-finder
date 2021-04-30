import * as React from 'react'
import { connect } from 'react-redux'
import { FaExternalLinkAlt, FaGithub, FaUserAstronaut } from 'react-icons/fa'
import {
  Box,
  Text,
  Menu,
  Flex,
  Input,
  Stack,
  Button,
  Spacer,
  Center,
  Avatar,
  Heading,
  Spinner,
  MenuList,
  Skeleton,
  Container,
  InputGroup,
  MenuButton,
  IconButton,
  MenuDivider,
  FormControl,
  MenuItemOption,
  FormHelperText,
  SkeletonCircle,
  MenuOptionGroup,
  InputLeftElement,
  InputRightElement,
  Link,
} from '@chakra-ui/react'
import axios from 'axios'

const Home: React.FC<{}> = () => {
  const [data, setData] = React.useState([])
  const [username, setUsername] = React.useState<string>('')
  const [sortBy, setSortBy] = React.useState<string>('created')
  const [orderBy, setOrderBy] = React.useState<string>('asc')

  const [typingTimeout, setTypingTimeout] = React.useState<number | NodeJS.Timeout>(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const inputElem = React.useRef(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    if (typingTimeout) {
      clearTimeout(typingTimeout as NodeJS.Timeout)
    }

    setUsername(value)

    if (!!value) {
      setTypingTimeout(
        setTimeout(() => {
          setIsLoading(true)
          axios
            .get(`https://api.github.com/users/${value}/repos`, {
              params: {
                sort: sortBy,
                direction: orderBy,
              },
            })
            .then(({ data }) => {
              setData(data)
              setIsLoading(false)
            })
            .catch(err => {
              console.error('err: ', err)
              throw err
            })
        }, 1000)
      )
    }
  }

  return (
    <Container maxW="container.md" py="20">
      <Stack spacing={8}>
        <Flex>
          <Center>
            <FaGithub size="5rem" />
          </Center>
          <Box px={3}>
            <Heading as="h1" size="lg">
              Github User's Repos Finder
            </Heading>
            <Text fontSize="xl" textColor="gray.500">
              Elit id consequat aliquip cillum exercitation culpa ea nostrud in et est amet
              voluptate.
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box w="80%">
            <FormControl id="username">
              <InputGroup>
                <InputLeftElement children={<FaUserAstronaut />} />
                <Input
                  ref={inputElem}
                  value={username}
                  onChange={handleChange}
                  placeholder="Type github username here..."
                />
                {isLoading && <InputRightElement children={<Spinner />} />}
              </InputGroup>
              <FormHelperText>Example: thisisdhika, facebook, microsoft, etc..</FormHelperText>
            </FormControl>
          </Box>
          <Spacer />
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme="blue">
              Filter Option
            </MenuButton>
            <MenuList minW={60}>
              <MenuOptionGroup
                type="radio"
                value={sortBy}
                title="Sort By"
                onChange={value => setSortBy(value as string)}>
                <MenuItemOption value="created">Created</MenuItemOption>
                <MenuItemOption value="updated">Updated</MenuItemOption>
                <MenuItemOption value="pushed">Pushed</MenuItemOption>
                <MenuItemOption value="full_name">Full Name</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                type="radio"
                title="Order"
                value={orderBy}
                onChange={value => setOrderBy(value as string)}>
                <MenuItemOption value="asc">Ascending</MenuItemOption>
                <MenuItemOption value="desc">Descending</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        <Stack>
          {isLoading && !!username
            ? Array(6)
                .fill('')
                .map((_, key) => (
                  <Box key={key} borderWidth="1px" borderRadius="lg">
                    <Flex p="4" alignItems="center">
                      <Center>
                        <SkeletonCircle size="64px" />
                      </Center>
                      <Box px="4">
                        <Skeleton height="16px" width="8rem" />
                        <Skeleton mt={2} height="14px" width="18rem" />
                      </Box>
                      <Center ml="auto">
                        <Skeleton mt={2} height="40px" width="40px" borderRadius="0.375rem" />
                      </Center>
                    </Flex>
                  </Box>
                ))
            : data.length > 0 &&
              data.map(({ owner, name, full_name, description, svn_url }, key) => (
                <Box key={key} borderWidth="1px" borderRadius="lg">
                  <Flex p="4" alignItems="center">
                    <Center>
                      <Avatar size="lg" name={username} src={(owner as any).avatar_url} />
                    </Center>
                    <Box px="4">
                      <Box fontWeight="bold" as="h1" lineHeight="tight">
                        {name}{' '}
                        <Box as="span" fontWeight="light" color="gray.600" fontSize="sm">
                          {full_name}
                        </Box>
                      </Box>
                      <Box maxWidth="30rem" as="p" isTruncated>
                        {description}
                      </Box>
                    </Box>
                    <Center ml="auto">
                      <IconButton
                        as={Link}
                        href={svn_url}
                        aria-label="Call Segun"
                        icon={<FaExternalLinkAlt />}
                      />
                    </Center>
                  </Flex>
                </Box>
              ))}
        </Stack>
      </Stack>
    </Container>
  )
}

export default connect()(Home)
