"use client";
import React, { useState, useEffect } from "react";
import { useReadContract, useWalletClient } from "wagmi";
import contractABI from "@/src/contracts/ABI/Donation.json";
import { ethers } from "ethers";
import { Button, Modal, Form, Input, notification } from "antd";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function SubmitDonation() {
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(null);
    const [name, setName] = useState(null);
    const [memo, setMemo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: signer } = useWalletClient();
    const contractOnMumbai = useReadContract({
        addressOrName: contractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer,
    });

    useEffect(() => {
        if (success) {
            notification.success({
                message: "Success!",
                description: "Transaction was successful.",
                placement: "bottomRight",
                duration: 4,
            });
        }

        if (loading) {
            notification.info({
                message: "Waiting...",
                description: "Transaction is being processed.",
                placement: "bottomRight",
                duration: 4,
            });
        }
    }, [success, loading]);

    const buyACoffee = async (coffee) => {
        try {
            setSuccess(false);
            setLoading(false);
            if (contractOnMumbai) {
                let deposit = coffee
                    ? ethers.utils.parseEther("0.001")
                    : ethers.utils.parseEther("0.01");
                const txn = await contractOnMumbai.buyCoffee(name, memo, {
                    value: deposit,
                    gasLimit: 900000,
                });
                setLoading(true);
                await txn.wait();
                setLoading(false);
                setSuccess(true);
            } else {
                setSuccess(false);
                setLoading(false);
                notification.error({
                    message: "Error",
                    description:
                        "Something went wrong. Please refresh and try again.",
                    placement: "bottomRight",
                    duration: 4,
                });
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            notification.error({
                message: "Error",
                description:
                    "Something went wrong. Please refresh and try again.",
                placement: "bottomRight",
                duration: 4,
            });
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Send Coffee
            </Button>
            <Modal
                title="Send Coffee ☕️"
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <p>
                    Coffee = 0.001 AVAX
                    <br />
                    Large Coffee = 0.01 AVAX
                    <br />
                    <br />
                </p>
                <Form layout="vertical">
                    <Form.Item label="From">
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                    </Form.Item>
                    <Form.Item label="Memo">
                        <Input
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="Type a Short Message"
                        />
                    </Form.Item>
                </Form>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="primary"
                        onClick={() => buyACoffee(true)}
                        style={{ marginRight: "10px" }}
                    >
                        Send Coffee
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => buyACoffee(false)}
                        style={{ marginRight: "10px" }}
                    >
                        Send Large Coffee
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </Modal>
        </>
    );
}
