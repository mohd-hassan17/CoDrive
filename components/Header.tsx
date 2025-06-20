import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOutUser } from "@/lib/actions/user.actions";
// import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
// import { signOutUser } from "@/lib/actions/user.actions";

type Props = {
    fullName: string;
    email: string;
    avatar: string;
    userId: string;
    accountId: string;
}

const Header = ({fullName, email, avatar, userId, accountId}: Props) => {
  return (
    <header className="header">
      {/* <Search /> */}
      <div className="header-wrapper">
        <div>

        <FileUploader ownerId={userId} accountId={accountId} />
        </div>
        <form action={async () => {
            'use server'
            await signOutUser()
        }}>
 {/* <div className="sidebar-user-info">
                    <Image
                      src='/assets/images/avatar.png'
                      alt="Avatar"
                      width={44}
                      height={44}
                      className="sidebar-user-avatar"
                    />
                    <div className="hidden lg:block">
                      <p className="subtitle-2 capitalize">{fullName}</p>
                      <p className="caption truncate max-w-[170px]">{email}</p>
                    </div>
                  </div> */}

                  
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