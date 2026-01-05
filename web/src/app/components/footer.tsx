'use client'
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme,
  Stack,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

interface FooterProps {
  companyName?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

const Footer: React.FC<FooterProps> = ({ 
  companyName = "WINTENSCARE" 
}) => {
  const theme = useTheme();

  const linksColumn1: FooterLink[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Technology', href: '/technology' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const linksColumn2: FooterLink[] = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Security Practices', href: '/security' },
    { label: 'Compliance (HIPAA/GDPR)', href: '/compliance' },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Content Area */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-start' },
            gap: { xs: 4, md: 6 },
            mb: 4,
          }}
        >
          {/* Company Info */}
          <Box
            sx={{
              flex: { md: '1 1 40%' },
              maxWidth: { md: '400px' },
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              {companyName}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                lineHeight: 1.6,
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              We are dedicated to building technology that strengthens human 
              connection and empowers healthier lives.
            </Typography>
          </Box>

          {/* Links Container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 3, sm: 6, md: 8 },
              flex: { md: '1 1 60%' },
              justifyContent: { sm: 'space-between' },
            }}
          >
            {/* Links Column 1 */}
            <Box>
              <Typography 
                variant="subtitle1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                WINTENSCARE
              </Typography>
              <Stack spacing={1.5}>
                {linksColumn1.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        textDecoration: 'underline',
                      },
                      transition: 'color 0.2s ease-in-out',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Links Column 2 */}
            <Box>
              <Typography 
                variant="subtitle1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Legal
              </Typography>
              <Stack spacing={1.5}>
                {linksColumn2.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        textDecoration: 'underline',
                      },
                      transition: 'color 0.2s ease-in-out',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Social Media */}
            <Box>
              <Typography 
                variant="subtitle1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Follow Us
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1,
                  flexWrap: 'wrap'
                }}
              >
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      color: 'text.secondary',
                      backgroundColor: theme.palette.action.hover,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                      transition: 'all 0.3s ease-in-out',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </Typography>
          
          {/* Optional: Additional copyright links */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
            }}
          >
            <Link
              href="/privacy"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                fontSize: '0.875rem'
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                fontSize: '0.875rem'
              }}
            >
              Terms
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;