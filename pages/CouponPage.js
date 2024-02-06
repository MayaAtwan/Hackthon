import styles from "../Style/CuponPage.module.css";
import Image from "next/image";
import React from "react";
import Navbar from "../Components/Navbar";
import GiftCardImage from "../giftcard.png";
import cuopon from "../coupon1.png"

const CouponPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.couponImagesContainer}>
            <div className={styles.buttonContainer}>
              <p className={styles.giftCardTitle}>Coupon</p>
              <p>You can use this discount at QueenB course</p>
              <Image
                src={GiftCardImage}
                width={300}
                height={225}
                className={styles.couponImage}
                alt="GiftCard 1"
              />
            </div>
            <div className={styles.buttonContainer}>
              <p>Gift Card</p>
              <p>Coupon: You can buy things from Superpharm</p>
              <Image
                src={cuopon}
                width={300}
                height={225}
                className={styles.couponImage}
                alt="GiftCard 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
