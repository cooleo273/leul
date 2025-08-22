"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
	children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      // Normalize locale-prefixed paths like "/am/..." or "/en/..." to their base equivalent
      const stripLocale = (path: string | null): string => {
        if (!path) return "/";
        // Replace a leading /en or /am (optionally followed by a slash) with just "/"
        const normalized = path.replace(/^\/(en|am)(?=\/|$)/, "");
        return normalized === "" ? "/" : normalized;
      };

      const checkRouteEnabled = () => {
        const effectivePath = stripLocale(pathname);
        if (!effectivePath) return true; // be permissive by default

        // Exact route match: only block if explicitly set to false
        const hasExact = Object.prototype.hasOwnProperty.call(routes, effectivePath);
        if (hasExact) {
          const flag = (routes as Record<string, unknown>)[effectivePath];
          return flag !== false;
        }

        // Dynamic sections: only block if parent route is explicitly false
        const dynamicParents = ["/blog", "/work"] as const;
        for (const parent of dynamicParents) {
          if (effectivePath.startsWith(parent)) {
            const parentFlag = (routes as Record<string, unknown>)[parent];
            return parentFlag !== false; // treat undefined as allowed
          }
        }

        // Unknown paths: allow and let Next.js routing handle actual 404s
        return true;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      const effectivePath = stripLocale(pathname);
      if (protectedRoutes[effectivePath as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
		return <NotFound />;
	}

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
