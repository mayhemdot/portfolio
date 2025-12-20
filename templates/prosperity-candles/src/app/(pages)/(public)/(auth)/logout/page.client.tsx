"use client";

import Link from "next/link";
import type React from "react";
import { Fragment, useEffect, useState } from "react";
import { LinkButton } from "@/components/LinkButton";
import { SuccessfullyMessage } from "@/components/SuccessfullyMessage";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "@/payload/payload-types";

export const LogoutPage: React.FC<any> = props => {
	const { settings } = props;
	const { productsPage } = settings || {};
	// const { logout } = useAuth();
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	// useEffect(() => {
	// 	const performLogout = async () => {
	// 		try {
	// 			await logout();
	// 			setSuccess("Logged out successfully.");
	// 		} catch (_) {
	// 			setError("You are already logged out.");
	// 		}
	// 	};

	// 	performLogout();
	// }, [logout]);

	return (
		<Fragment>
			{/* {error && (
        <Card className="mx-auto">
          <CardHeader>
            <h1>{error || success}</h1>
          </CardHeader>
          <CardContent>
            <p>
              {'What would you like to do next?'}
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/${productsPage.slug}`}
                    className={buttonVariants({
                      variant: 'link',
                      className: 'capitalize',
                      size: 'none',
                    })}
                  >
                    Click here
                  </Link>
                  {` to shop.`}
                </Fragment>
              )}
              <br />
              {` To log back in, `}
              <Link
                href="/login"
                className={buttonVariants({
                  variant: 'link',
                  size: 'none',
                })}
              >
                click here
              </Link>
              {'.'}
            </p>
          </CardContent>
        </Card>
      )} */}

			{success ||
				(error && (
					<SuccessfullyMessage
						title={error || success}
						message={
							<>
								<span>{"What would you like to do next?"}</span>
								<div className={"mt-4 flex items-center gap-2"}>
									<LinkButton
										aria-label={"login"}
										href={`/login`}
										variant='outline'
										size={"lg"}
										className=''
									>
										{"To log back in"}
									</LinkButton>

									{typeof productsPage === "object" && productsPage?.slug && (
										<LinkButton
											href={`/${productsPage.slug}`}
											variant='secondary'
											size={"lg"}
											className='ml-1'
										>
											{"To shop"}
										</LinkButton>
									)}
								</div>
							</>
						}
					/>
				))}
		</Fragment>
	);
};
