import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOutUser } from "@/lib/actions/user.actions";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";

type Props = {
    userId: string;
    accountId: string;
}

const Header = ({ userId, accountId}: Props) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <div>

        <FileUploader ownerId={userId} accountId={accountId} />
        </div>
        <form action={async () => {
            'use server'
            await signOutUser()
        }}>
 

                  
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
           
             
        </form>
      </div>
    </header>
  );
};
export default Header;