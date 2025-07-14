import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Container,
  Alert,
  AlertIcon,
  useToast,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { useAuth } from '../context/authContext';
import type { User } from '../types/user';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

  const demoUsers: User[] = [
    {
      userId: 'user_admin_001',
      email: 'admin@heapcase.com',
      userRole: 'admin',
      planType: 'premium',
      firstName: 'Admin',
      lastName: 'User'
    },
    {
      userId: 'user_subscriber_002',
      email: 'subscriber@heapcase.com',
      userRole: 'subscriber',
      planType: 'free',
      firstName: 'Regular',
      lastName: 'User'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simüle loading
    await new Promise(resolve => setTimeout(resolve, 1000));  
    
    const user = demoUsers.find(u => u.email === email);   
    
    if (user && password.trim() !== '') {
      login(user);
      toast({
        title: 'Giriş Başarılı! 🎉',
        description: `Hoş geldin ${user.firstName}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (!user) {
      toast({
        title: 'Hata!',
        description: 'Kullanıcı bulunamadı! Demo emaillerini kullanın.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Hata!',
        description: 'Lütfen bir password girin.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (user: User) => {
    setEmail(user.email);
    login(user);
    toast({
      title: 'Demo Giriş!',
      description: `${user.firstName} olarak giriş yapıldı`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(135deg, blue.400, purple.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={5}
    >
      <Container maxW="lg">
        <Card shadow="2xl" borderRadius="2xl">
          <CardBody p={8}>
            <VStack spacing={6}>
              {/* Header */}
              <VStack spacing={2} textAlign="center">
                <Heading size="xl" color="gray.700">
                  🎯 Heap Analytics
                </Heading>
                <Text color="gray.500" fontSize="lg">
                  Case Study Demo
                </Text>
              </VStack>
              
              {/* Login Form */}
              <Box as="form" onSubmit={handleLogin} w="100%">
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="600" color="gray.700">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@heapcase.com"
                      size="lg"
                      focusBorderColor="blue.400"
                      borderWidth={2}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel fontWeight="600" color="gray.700">
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type your password"
                      size="lg"
                      focusBorderColor="blue.400"
                      borderWidth={2}
                    />
                  </FormControl>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    w="100%"
                    isLoading={isLoading}
                    loadingText="Logging in..."
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    color="white"
                    _hover={{ bgGradient: "linear(to-r, blue.500, purple.600)" }}
                    _active={{ transform: "translateY(1px)" }}
                  >
                     Log in 
                  </Button>
                </VStack>
              </Box>
              
              <Divider />
              
              {/* Demo Login Section */}
              <Alert 
                status="info" 
                variant="solid"
                borderRadius="lg"
                flexDirection="column"
                alignItems="flex-start"
                p={6}
                bgGradient="linear(135deg, purple.400, blue.500)"
                color="white"
              >
                <HStack mb={3}>
                  <AlertIcon color="white" />
                  <Text fontWeight="600" color="white">
                     Quick Demo Login:
                  </Text>
                </HStack>
                
                <VStack spacing={3} w="100%" align="stretch">
                  {demoUsers.map((user, index) => (
                    <Button
                      key={index}
                      onClick={() => handleDemoLogin(user)}
                      variant="solid"
                      size="md"
                      bg="whiteAlpha.200"
                      color="white"
                      justifyContent="space-between"
                      w="100%"
                      px={6}
                      _hover={{ 
                        bg: "whiteAlpha.300",
                        transform: "translateY(-1px)",
                        boxShadow: "lg"
                      }}
                      _active={{ transform: "translateY(0px)" }}
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      rightIcon={
                        <HStack spacing={2}>
                          <Badge 
                            colorScheme={user.userRole === 'admin' ? 'red' : 'green'}
                            variant="solid"
                            fontSize="xs"
                          >
                            {user.userRole}
                          </Badge>
                          <Badge 
                            colorScheme={user.planType === 'premium' ? 'yellow' : 'blue'}
                            variant="solid"
                            fontSize="xs"
                          >
                            {user.planType}
                          </Badge>
                        </HStack>
                      }
                    >
                      <Text fontSize="sm">{user.email}</Text>
                    </Button>
                  ))}
                </VStack>
              </Alert>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginComponent;
