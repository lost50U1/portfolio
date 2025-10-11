"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  archived: boolean;
}

export default function MessagesPage() {
  const [tab, setTab] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Sample message data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma.j@example.com",
      subject: "Collaboration opportunity",
      message:
        "Hi there, I saw your portfolio and was really impressed with your work. I'm working on a new project for a client and think your skills would be perfect for it. Would you be interested in discussing a potential collaboration? The project involves building a custom e-commerce solution with some unique requirements. Let me know if you'd like to hear more details. Thanks, Emma",
      date: "2023-05-06T14:30:00",
      read: false,
      archived: false,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@company.co",
      subject: "Project quote request",
      message:
        "Hello, I represent Company Co. and we're looking to redesign our website. I've checked your portfolio and would like to request a quote for a complete website overhaul. Our current site is outdated and not mobile-friendly. We need a modern, responsive design with e-commerce capabilities. Could you provide a rough estimate and timeline for this kind of project? Looking forward to your response. Best regards, Michael Chen, Marketing Director",
      date: "2023-05-05T09:15:00",
      read: false,
      archived: false,
    },
    {
      id: 3,
      name: "Sarah Williams",
      email: "sarah.w@gmail.com",
      subject: "Job opportunity at TechCorp",
      message:
        "Hi, I'm a recruiter at TechCorp and we're currently looking for a talented full-stack developer to join our team. I came across your portfolio and was really impressed with your skills and projects. We're working on some exciting products and I think you'd be a great fit for our team. Would you be interested in discussing this opportunity further? We offer competitive pay, flexible hours, and a great work environment. Please let me know if you'd like to hear more details. Best, Sarah",
      date: "2023-05-04T16:45:00",
      read: true,
      archived: false,
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "david.r@startup.io",
      subject: "Startup partnership proposal",
      message:
        "Hello, I'm the founder of a new startup focused on AI-driven productivity tools. I'm looking for a technical co-founder or early partner who can help lead our development efforts. Your portfolio projects show exactly the kind of expertise we need. Would you be open to discussing a potential partnership? We have secured initial funding and are ready to move quickly. I'd love to share our vision and see if there might be a fit. Best regards, David",
      date: "2023-05-03T11:20:00",
      read: true,
      archived: false,
    },
    {
      id: 5,
      name: "Jessica Lee",
      email: "jessica@designfirm.com",
      subject: "Collaboration on design system",
      message:
        "Hi there, I'm a UI/UX designer at DesignFirm, and I'm reaching out because I love your development style. We're working on a comprehensive design system for a major client and need a developer who can implement it flawlessly. Your attention to detail in your portfolio projects caught my eye. Would you be interested in collaborating? This could be a long-term partnership if things go well. Let me know if you'd like to discuss further! Thanks, Jessica",
      date: "2023-05-02T13:10:00",
      read: true,
      archived: true,
    },
  ]);

  const viewMessage = (message: Message) => {
    // Mark as read if not already
    if (!message.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m)),
      );
    }
    setSelectedMessage(message);
  };

  const archiveMessage = (id: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, archived: true } : message,
      ),
    );

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }

    toast("Message archived", {
      description: "The message has been moved to the archive.",
    });
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }

    toast("Message deleted", {
      description: "The message has been permanently deleted.",
    });
  };

  const restoreMessage = (id: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, archived: false } : message,
      ),
    );

    toast("Message restored", {
      description: "The message has been moved back to your inbox.",
    });
  };

  // Filter messages based on tab and search term
  const filteredMessages = messages.filter((message) => {
    const matchesTab =
      (tab === "inbox" && !message.archived) ||
      (tab === "archive" && message.archived);
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Count unread messages
  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Messages</h1>
          <p className="text-muted-foreground">
            Manage messages from your contact form
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Messages sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                You have {unreadCount} unread messages
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-4 pb-4">
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="inbox"
                    className="data-[state=active]:bg-background data-[state=active]:border-primary flex-1 rounded-none border-b-2 data-[state=active]:shadow-none"
                  >
                    Inbox{" "}
                    {unreadCount > 0 && (
                      <Badge className="bg-primary ml-2">{unreadCount}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="archive"
                    className="data-[state=active]:bg-background data-[state=active]:border-primary flex-1 rounded-none border-b-2 data-[state=active]:shadow-none"
                  >
                    Archive
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="inbox" className="m-0 p-0">
                  {filteredMessages.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">No messages found</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`hover:bg-muted/50 cursor-pointer p-4 ${
                            message.read ? "" : "bg-blue-50"
                          } ${
                            selectedMessage?.id === message.id ? "bg-muted" : ""
                          }`}
                          onClick={() => viewMessage(message)}
                        >
                          <div className="flex justify-between">
                            <h3
                              className={`font-medium ${message.read ? "" : "font-semibold"}`}
                            >
                              {message.name}
                            </h3>
                            <span className="text-muted-foreground text-xs">
                              {formatDate(message.date)}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {message.email}
                          </p>
                          <p className="mt-1 truncate text-sm">
                            {message.subject}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="archive" className="m-0 p-0">
                  {filteredMessages.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">
                        No archived messages
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`hover:bg-muted/50 cursor-pointer p-4 ${
                            selectedMessage?.id === message.id ? "bg-muted" : ""
                          }`}
                          onClick={() => viewMessage(message)}
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{message.name}</h3>
                            <span className="text-muted-foreground text-xs">
                              {formatDate(message.date)}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {message.email}
                          </p>
                          <p className="mt-1 truncate text-sm">
                            {message.subject}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Message content */}
        <div className="md:col-span-2">
          {selectedMessage ? (
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{selectedMessage.subject}</CardTitle>
                  <CardDescription className="mt-2">
                    From: {selectedMessage.name} ({selectedMessage.email})
                    <br />
                    Date: {formatDate(selectedMessage.date)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {selectedMessage.archived ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => restoreMessage(selectedMessage.id)}
                    >
                      Restore
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      Archive
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    Delete
                  </Button>
                  <Button size="sm">Reply</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex h-full items-center justify-center">
              <div className="p-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground mx-auto mb-4 h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mb-2 text-lg font-medium">
                  No message selected
                </h3>
                <p className="text-muted-foreground">
                  Select a message from the list to view its contents
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
