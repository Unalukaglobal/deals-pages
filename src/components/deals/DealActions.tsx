"use client";

import { useState, useEffect, useCallback } from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { toggleLike, getLikes, isLiked } from "@/lib/likes";
import { getCommentCount } from "@/lib/comments";
import { getUser } from "@/lib/auth";
import { SignUpDialog } from "@/components/auth/SignUpDialog";

interface DealActionsProps {
  dealId: string;
  onCommentClick?: () => void;
  compact?: boolean;
}

export function DealActions({ dealId, onCommentClick, compact }: DealActionsProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);

  const refresh = useCallback(() => {
    setLikeCount(getLikes(dealId));
    setLiked(isLiked(dealId));
    setCommentCount(getCommentCount(dealId));
  }, [dealId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!getUser()) {
      setShowSignUp(true);
      return;
    }
    toggleLike(dealId);
    refresh();
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!getUser()) {
      setShowSignUp(true);
      return;
    }
    onCommentClick?.();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ url: window.location.origin + `/go/${dealId}` });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/go/${dealId}`);
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 ${compact ? "text-xs" : "text-sm"} text-muted-foreground`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-accent ${liked ? "text-deal-red" : ""}`}
        >
          <ThumbsUp className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          <span>{likeCount || ""}</span>
        </button>

        <button
          onClick={handleComment}
          className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-accent"
        >
          <MessageCircle className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          <span>{commentCount || ""}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-accent"
        >
          <Share2 className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>
      </div>

      <SignUpDialog
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={refresh}
      />
    </>
  );
}
