import { FC, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import Image from 'next/image';
import { Accept } from "components/Icons";

type Props = {
    handleJoinModalToggle: () => void;
};

export const GuestCard: FC<Props> = ({
    handleJoinModalToggle,
}) => {

    const { logged } = useSelector((state: RootStateOrAny) => ({
        logged: state.auth.logged,
      }));

    return (
        <>
            <div className="mx-7 md:max-w-[370px] sm:w-[calc(100%-72px)] xs:w-[calc(100%-72px)] bg-brandblack rounded-3xl p-[50px] mb-4">
                <h2 className="text-center tracking-widest mb-10 p-2">Playing as guest.</h2>
                <div className="flex justify-center">
                    <Image src="/images/guest.png" width={318} height={218}/>
                </div>
                <p className="text-sm font-thin p-2 text-center mb-2">Your information will be locally stored and your experience limited.</p>
                <div className="w-full flex justify-center">
                    <button
                        className="gap-2 text-md normal-case rounded-full btn btn-primary px-6 w-full"
                        onClick={handleJoinModalToggle}
                        disabled={logged}
                    >
                        <Accept />
                        Join as Guest
                    </button>
                </div>
            </div>
        </>
    );
}