import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Badge,
  Card,
  CardBody,
  Container,
  useColorModeValue,
  SimpleGrid,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/authContext';
import { useHeapTracking } from '../hooks/useHeapTracking';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { trackEvent } = useHeapTracking(user, true);
  const toast = useToast();
  
  const bgGradient = useColorModeValue('linear(135deg, blue.400, purple.500)', 'linear(135deg, blue.600, purple.700)');
  const cardBg = useColorModeValue('white', 'gray.800');

  const features = [
    { name: 'Analytics Dashboard', icon: '📊', premium: false },
    { name: 'Advanced Reports', icon: '📈', premium: true },
    { name: 'User Settings', icon: '⚙️', premium: false },
    { name: 'Team Management', icon: '👥', premium: true },
    { name: 'API Access', icon: '🔌', premium: true },
    { name: 'Export Data', icon: '💾', premium: false }
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.premium && user?.planType === 'free') {
      trackEvent('Feature Blocked - Upgrade Required', {
        featureName: feature.name,
        upgradePrompted: true
      });
      toast({
        title: 'Premium Feature! 💎',
        description: 'This feature requires Premium plan!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    trackEvent('Feature Used', {
      featureName: feature.name,
      featureType: feature.premium ? 'premium' : 'free'
    });
    
    toast({
      title: 'Success! ✅',
      description: `${feature.name} opened successfully!`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    trackEvent('Logout Button Clicked');
    logout();
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient} p={5}>
      <Container maxW="6xl" centerContent>
        <VStack spacing={8} w="100%">
          {/* Header */}
          <VStack spacing={3} textAlign="center" pt={8}>
            <Heading size="2xl" color="white">
              🎯 Dashboard
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900">
              Welcome, {user?.firstName}! 👋
            </Text>
          </VStack>

          {/* User Profile Card */}
          <Card w="100%" bg={cardBg} shadow="xl" borderRadius="2xl">
            <CardBody p={8}>
              <HStack spacing={6} align="start">
                <Avatar 
                  size="xl" 
                  name={`${user?.firstName} ${user?.lastName}`}
                  bg="blue.500"
                />
                <VStack align="start" spacing={3} flex={1}>
                  <Heading size="lg" color="gray.700">
                    👤 User Profile
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="600" color="gray.600">📧 Email:</Text>
                      <Text fontSize="lg">{user?.email}</Text>
                      <Text fontWeight="600" color="gray.600">🆔 User ID:</Text>
                      <Text fontSize="sm" color="gray.500" fontFamily="mono">{user?.userId}</Text>
                      <Text fontWeight="600" color="gray.600">👤 Name:</Text>
                      <Text fontSize="lg">{user?.firstName} {user?.lastName}</Text>
                    </VStack>
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="600" color="gray.600">🔰 Rol:</Text>
                      <HStack>
                        <Text fontSize="lg">{user?.userRole}</Text>
                        <Badge 
                          colorScheme={user?.userRole === 'admin' ? 'red' : 'green'}
                          variant="solid"
                          textTransform="uppercase"
                        >
                          {user?.userRole}
                        </Badge>
                      </HStack>
                      <Text fontWeight="600" color="gray.600">💎 Plan:</Text>
                      <HStack>
                        <Text fontSize="lg">{user?.planType}</Text>
                        <Badge 
                          colorScheme={user?.planType === 'premium' ? 'yellow' : 'blue'}
                          variant="solid"
                          textTransform="uppercase"
                        >
                          {user?.planType}
                        </Badge>
                      </HStack>
                    </VStack>
                  </SimpleGrid>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          {/* Features Grid */}
          <Card w="100%" bg={cardBg} shadow="xl" borderRadius="2xl">
            <CardBody p={8}>
              <VStack spacing={6} align="start">
                <Heading size="lg" color="gray.700">
                  🛠️ Features (Heap Analytics Test)
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="100%">
                  {features.map((feature, index) => (
                    <Card 
                      key={index}
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                      onClick={() => handleFeatureClick(feature)}
                      bg={feature.premium && user?.planType === 'free' ? 'gray.50' : 'white'}
                      borderWidth={feature.premium && user?.planType === 'free' ? 2 : 1}
                      borderColor={feature.premium && user?.planType === 'free' ? 'orange.200' : 'gray.200'}
                      opacity={feature.premium && user?.planType === 'free' ? 0.7 : 1}
                    >
                      <CardBody p={6}>
                        <VStack spacing={3}>
                          <Text fontSize="3xl">{feature.icon}</Text>
                          <Text fontWeight="600" textAlign="center">
                            {feature.name}
                          </Text>
                          {feature.premium && (
                            <Badge colorScheme="orange" variant="solid">
                              PREMIUM
                            </Badge>
                          )}
                          {feature.premium && user?.planType === 'free' && (
                            <Text fontSize="sm" color="orange.600" textAlign="center">
                              Requires Premium
                            </Text>
                          )}
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <HStack spacing={4} flexWrap="wrap" justify="center">
            <Button
              size="lg"
              colorScheme="red"
              onClick={handleLogout}
              bgGradient="linear(to-r, red.400, red.600)"
              _hover={{ bgGradient: "linear(to-r, red.500, red.700)" }}
            >
              Log Out
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;
